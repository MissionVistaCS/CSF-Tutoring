const TutorRequestEntry = require(_base + 'models/TutorRequestEntry');
const User = require(_base + 'models/User');

module.exports = {
    pairRequestWithTutor(id) {
        setTimeout(function () {
            TutorRequestEntry.findById(id, function (err, entry) {

            });
        }, 0);
    }
};