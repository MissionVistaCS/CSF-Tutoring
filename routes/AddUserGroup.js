const auth = require(_base + 'middleware/Authentication'),
	boiler = require(_base + 'middleware/Boiler'),
	User = require(_base + 'models/User');

const NAME = 'Add User Group';

module.exports = {
	'/api/add-user-group': {
		methods: ['post'],
		middleware: [auth.ensureAdmin, boiler.requireFields(['user', 'group']), boiler.makeAlphaNumerics(['user', 'group']), boiler.handleErrors],
		fn: function(req, res, next) {
			let user = req.body.user;
			let group = req.body.group;
			User.findById(user, function(err, userF) {
				if(err) {
					return res.User(NAME, err);
				}

				if(userF) {
					userF.userGroup.push(group);
					userF.save(function (err, updatedF) {
						res.sendBaseResponse(NAME, null, 'Added user to ' + group + '.');
					});
				}
			});
		}
	}
};
