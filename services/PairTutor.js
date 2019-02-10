//NOTE: "User" and "tutor" are interchangeable. So are "entry" and "tutee"
const async = require("async");

const TutorRequestEntry = require(_base + 'models/TutorRequestEntry');
const User = require(_base + 'models/User');
const SNS = require(_base + 'services/SNS');

module.exports = {
    pairRequestWithTutor(id) {
        setTimeout(function () {
            TutorRequestEntry.findById(id, function (err, entry) {
                let paymentQuery = entry.payment === 'BOTH' ? ['BOTH', 'CASH'] : ['BOTH']; //If payment requested is BOTH (cash/comm. service), we match with any tutor payment type. Else if payment requested is comm. service, we match with tutors that accept both.
                                                                                           //This is because the tutors have BOTH or CASH options, while the tutees have BOTH or COMM_SERVICE

                let eCourses = entry.courses.length; //Number of courses the tutee requested
                let eGrade = entry.grade; //The grade of the tutee

                User.find({
                    userGroup: {$all: ['TUTOR']}, //We search for users that are tutors
                    courses: {$all: entry.courses}, //Who are able to tutor the requested courses
                    payment: {$in: paymentQuery}, //For the specified payment type
                    cellPhoneVerified: true, //And have verified phone numbers
                    verified: true //Along with being verified by the admin
                }, function (err, users) {
                    if (err) {
                        return console.info("Error in querying list of users eligible for pairing.");
                    }

                    //This async call is used to count the number of entries (tutees) each eligible tutor is already paired with. This info is used in the algorithm.
                    async.each(users, function (user, fn) {
                        TutorRequestEntry.find({ tutor: user._id, state: { $in: ['PENDING', 'UNACCEPTED', 'ACTIVE'] } }, function (err, entries) {
                            if (err) {
                                return fn(err);
                            }

                            user.numPairedEntries = entries.length;
                            fn();
                        });
                    }, function (err) {
                        if (err) {
                            return console.info("Error in querying entries for counting tutees.");
                        }

                        let bestUser = null; //Art is a lie that makes us realize the truth
                        let gradeTrigger = true;
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            let uCourses = user.courses.length;
                            let uGrade = user.grade;
                            let uGender = user.gender;
                            let uTutees = user.numPairedEntries; //Number of entrees currently assigned to the tutor

                            if (uTutees < user.maxStudents) {
                                //START ALGORITHM///
                                if (!bestUser) {
                                    bestUser = user;
                                    if (uGrade >= eGrade) {
                                        gradeTrigger = false;
                                    }
                                    continue;
                                }

                                if (uTutees < bestUser.numPairedEntries) { //Default tutor is the one with least number of tutees. Ensures everyone gets at least one
                                    bestUser = user;
                                } else if (uTutees === bestUser.numPairedEntries) {
                                    if (uGrade >= eGrade) {
                                        if (gradeTrigger) {
                                            bestUser = user;
                                        } else if (uCourses < bestUser.courses.length) {
                                            bestUser = user;
                                        } else if (uCourses === bestUser.courses.length) {
                                            if (uGrade > bestUser.grade) {
                                                bestUser = user;
                                            }
                                        }
                                        gradeTrigger = false;
                                    } else if (gradeTrigger) {
                                        if (uCourses < bestUser.courses.length) {
                                            bestUser = user;
                                        } else if (uCourses === bestUser.courses.length) {
                                            if (uGrade > bestUser.grade) {
                                                bestUser = user;
                                            }
                                        }
                                    }
                                }
                                //END ALGORITHM///
                            }
                        }

                        if (bestUser) {
                            entry.tutor = bestUser._id;
                            entry.state = 'PENDING';
                            entry.notifications = [];
                            entry.pairingAcceptance = null;
                            entry.save(function (err) {
                                if (err) {
                                    return console.info("Error in saving assigned tutor to entry.");
                                }
                                SNS.sendToAdmins("Pairing success: Tutee " + entry.fullName + " with tutor " + bestUser.fullName, function (err) {
                                    if (err) console.info("Error in notifying admins of pairing success between tutee " + entry.fullName + " and tutor " + bestUser.fullName);
                                });
                            });
                        } else {
                            entry.tutor = null;
                            entry.state = 'MANUAL';
                            entry.notifications = [];
                            entry.pairingAcceptance = null;
                            entry.save(function (err) {
                                if (err) {
                                    return console.info("Error in saving assigned tutor to entry after pairing failure.");
                                }
                                SNS.sendToAdmins("Pairing failure: " + entry.fullName, function (err) {
                                    if (err) console.info("Error in notifying admins of pairing failure for tutee " + entry.fullName);
                                });
                            });
                        }
                    });
                });
            });
        }, 0);
    },
    manualPairRequestWithTutor(entryID, tutorID) {
        setTimeout(function () {
            TutorRequestEntry.findById(entryID, function (err, entry) {
                if(err) {
                    return console.info("Error in querying tutor request entries");
                }
                else {
                    User.findById(tutorID, function (err, user) {
                        if (err) {
                            return console.info("Error in querying users");
                        }
                        else {
                            // TODO: doesn't manually pair if currently exceeds how many tutees the tutor can take
                            entry.tutor = user._id;
                            entry.state = 'PENDING';
                            entry.notifications = [];
                            entry.pairingAcceptance = null;
                            entry.save(function (err) {
                                if (err) {
                                    return console.info("Error in saving assigned tutor to entry");
                                }
                                SNS.sendToAdmins("Pairing success: Tutee " + entry.fullName + " with tutor " + user.fullName, function (err) {
                                    if (err) {
                                        console.info("Error in notifying admins of pairing success between tutee " + entry.fullName + " and tutor " + user.fullName);
                                    }
                                });
                            });
                        }
                    });
                }
            });
        });
    }
};