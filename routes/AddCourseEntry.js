const auth = require(_base + 'middleware/Authentication'),
    boiler = require(_base + 'middleware/Boiler'),
    TutorRequestEntry = require(_base + 'models/TutorRequestEntry');

const NAME = 'Add Course Entry';

module.exports = {
    '/api/add-course-entry': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['entry', 'course']), boiler.makeAlphaNumerics(['entry', 'course']), boiler.handleErrors],
        fn: function (req, res, next) {
            let entry = req.body.entry;
            let course = req.body.course;
            TutorRequestEntry.findById(entry, function (err, entryF) {
                if (err) {
                    return res.sendBaseResponse(NAME, err);
                }

                if (entryF) {
                    entryF.courses.push(course);
                    entryF.save(function (err, updatedF) {
                        if(err) {
                            return res.sendBaseResponse(NAME, err);
                        }
                        res.sendBaseResponse(NAME, null, 'Added ' + course + ' course to tutoring request entry.');
                    });
                }
            });
        }
    }
};