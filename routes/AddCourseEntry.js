const auth = require(_base + 'middleware/Authentication'),
    boiler = require(_base + 'middleware/Boiler'),
    User = require(_base + 'models/User');

const NAME = 'Add Course Entry';

module.exports = {
    '/api/add-course-entry': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['entry', 'course']), boiler.makeAlphaNumerics(['entry', 'course']), boiler.handleErrors],
        fn: function(req, res, next) {
            entry = req.body.entry;
            course = req.body.course;
            User.findById(entry, function(err, user) {
                if(err) {
                    req.sendBaseResponse(NAME, err);
                }
                if(user) {
                    user.courses.push(course);
                    user.save(function(err, updatedUser) {
                        res.sendBaseResponse(NAME, null, 'Added ' + course + ' course entry to user');
                    });
                }
            });
        }
    }
}