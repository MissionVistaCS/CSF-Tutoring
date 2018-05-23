const async = require("async");

const TutorRequestEntry = require(_base + 'models/TutorRequestEntry');
const User = require(_base + 'models/User');

const courseDifference = 2;

module.exports = {
    pairRequestWithTutor(id) {
        setTimeout(function () {
            TutorRequestEntry.findById(id, function (err, entry) {
                let paymentQuery = entry.payment === 'BOTH' ? ['BOTH', 'CASH'] : ['BOTH']; //If payment requested is BOTH (cash/comm. service), we match with any tutor payment type. Else if payment requested is comm. service, we match with tutors that accept both.

                let courses = entry.courses.length;
                let grade = entry.grade;

                User.find({ userGroup: { $all: ['TUTOR']  }, courses: { $all: entry.courses }, payment: { $in: paymentQuery }, cellPhoneVerified: true, verified: true }, function (err, users) {
                    if (err) {
                        return console.info("Error in querying list of users eligible for pairing.");
                    }

                    //users->all eligible tutors
                    let bestUser = null;
                    for (let i = 0; i < users.length; i++) {

                    }
                });
            });
        }, 0);
    }
};