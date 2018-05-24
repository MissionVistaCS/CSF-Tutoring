const async = require("async");

const TutorRequestEntry = require(_base + 'models/TutorRequestEntry');
const User = require(_base + 'models/User');

const courseDifference = 2;

module.exports = {
    pairRequestWithTutor(id) {
        setTimeout(function () {
            TutorRequestEntry.findById(id, function (err, entry) {
                let paymentQuery = entry.payment === 'BOTH' ? ['BOTH', 'CASH'] : ['BOTH']; //If payment requested is BOTH (cash/comm. service), we match with any tutor payment type. Else if payment requested is comm. service, we match with tutors that accept both.

                let eCourses = entry.courses.length;
                let eGrade = entry.grade;

                User.find({
                    userGroup: {$all: ['TUTOR']},
                    courses: {$all: entry.courses},
                    payment: {$in: paymentQuery},
                    cellPhoneVerified: true,
                    verified: true
                }, function (err, users) {
                    if (err) {
                        return console.info("Error in querying list of users eligible for pairing.");
                    }

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

                        let bestUser = null;
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            let uCourses = user.courses.length;
                            let uGrade = user.grade;
                            let uGender = user.gender;
                            let uTutees = user.numPairedEntries; //Number of entrees currently assigned to the tutor

                            if (uTutees < user.maxStudents) {
                                if (!bestUser) {
                                    bestUser = user;
                                    continue;
                                }

                                if (uTutees < bestUser.numPairedEntries) { //Default tutor is the one with least number of tutees. Ensures everyone gets at least one
                                    bestUser = user;
                                } else if (uTutees === bestUser.numPairedEntries) {
                                    if (uCourses < bestUser.courses.length) { //Users with less courses are prioritized
                                        // This block ensures that tutees are paired with tutors the the highest grade possible
                                        if (uGrade >= bestUser.grade) {
                                            bestUser = user;
                                        }
                                        ////////////////////////////////////
                                    } else {
////////                                // This block ensures that tutees are paired with tutors the the highest grade possible and grade is higher than tutee grade
                                        if (uGrade >= bestUser.grade && (uGrade > eGrade + 1 || (uGrade === 12 && eGrade === 12))) {
                                            bestUser = user;
                                        }
                                        ////////////////////////////////////
                                    }
                                }
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
                                //TODO: Alert admins of pairing.
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
                                //TODO: Alert admins of pairing failure.
                            });
                        }
                    });
                });
            });
        }, 0);
    }
};