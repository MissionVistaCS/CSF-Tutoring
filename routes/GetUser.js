const auth = require(_base + 'middleware/Authentication'),
	boiler = require(_base + 'middleware/Boiler'),
	User = require(_base + 'models/User');

const NAME = 'Get User';

module.exports = {
	'/api/get-user': {
		methods: ['get'],
		middleware: [auth.ensureAdmin, boiler.requireFields(['id']), boiler.makeAlphaSpecials(['id']), boiler.handleErrors],
		fn: function(req, res, next) {
            let id = req.query.id;
			User.findOne({_id: id}, function(err, user) {
				if(err) {
					return res.sendBaseResponse(NAME, err);
				} else {
				    res.sendBaseResponse(NAME, null, user);
                }
			});
		}
	}
};
