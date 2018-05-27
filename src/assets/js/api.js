let _api = {};

axios.defaults.withCredentials = true;

(function () {
	const root = 'http://localhost:3000/';
	const urls = {
		sessionUrl: 'api/session',
		coursesUrl: 'api/courses',
		loginUrl: 'api/login',
        logoutUrl: 'api/logout',
        allEntries: 'api/list-entries'
    };

	function url(api) {
		return root + urls[api];
	}

	function get(url, params, fn) {
		axios.get(url, {
			params: params
		})
		.then(function (response) {
			fn(null, response.data);
		})
		.catch(function (error) {
			fn(error);
		});
	}

	function post(url, params, fn) {
		axios.post(url, params)
		.then(function (response) {
			fn(null, response.data);
		})
		.catch(function (error) {
			fn(error);
		});	
	}

	_api.session = function (fn) {
		get(url('sessionUrl'), {}, fn);
	};

	_api.courses = function (fn) {
		get(url('coursesUrl'), {}, fn);
	};

    _api.login = function (email, password, fn) {
        post(url('loginUrl'), {email: email, password: password}, fn);
    };

    _api.logout = function (fn) {
        post(url('logoutUrl'), {}, fn);
    };

    _api.allEntries = function (fn) {
        get(url('allEntries'), {}, fn);
    };
})();
