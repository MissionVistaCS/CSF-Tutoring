let _api = {};

axios.defaults.withCredentials = true;

(function () {
	const root = 'http://localhost:3000/';
	const urls = {
		coursesUrl: 'api/courses'
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

	function put(url, params, fn) {
		axios.put(url, params)
		.then(function (response) {
			fn(null, response.data);
		})
		.catch(function (error) {
			fn(error);
		});
	}

	function del(url, params, fn) {
		axios.delete(url, { data: params })
		.then(function (response) {
			fn(null, response.data);
		})
		.catch(function (error) {
			fn(error);
		});
	}

	_api.courses = function (fn) {
		get(url('coursesUrl'), {}, fn);
	};
})();
