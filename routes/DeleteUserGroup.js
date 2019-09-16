const auth = require(_base + 'middleware/Authentication'),
    boiler = require(_base + 'middleware/Boiler'),
    User = require(_base + 'models/User');

const NAME = 'Delete User Group'

module.exports = {
    '/api/delete-user-group': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['id', 'group']), boiler.makeAlphaSpecials(['id', 'group'])],
        fn: function(req, res, next) {
            let id = req.body.id;
            let group = req.body.group;
            User.findById(id, function(err, userF) {
                if(err) {
                    return res.sendBaseResponse(NAME, err);
                }
                if(userF && userF.userGroup.includes(group)) {
                    let index = userF.userGroup.indexOf(group);
                    userF.userGroup.splice(index, 1);
                    userF.save(function(err, updatedUser) {
                        if(err) {
                            return req.sendBaseResponse(NAME, err);
                        }
                        res.sendBaseResponse(NAME, null, 'Deleted user group');
                    });
                }
            });
        }
    }
}