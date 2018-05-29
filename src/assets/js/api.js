let _api = {};

axios.defaults.withCredentials = true;

(function () {
    const root = 'http://localhost:3000/';
    const urls = {
        sessionUrl: 'api/session',
        coursesUrl: 'api/courses',
        loginUrl: 'api/login',
        logoutUrl: 'api/logout',
        allEntries: 'api/list-entries',
        editRequestUrl: 'api/edit-request',
        newPairUrl: 'api/new-pair',
        notifyUserUrl: 'api/notify-user',
        signupUrl: 'api/signup',
        editUserUrl: 'api/edit-user/:id'
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

    _api.getCourseName = function (id, fn) {
        get(url('coursesUrl'), {}, function (err, res) {
            if (err) {
                fn(err);
            }
            else if (res.data) {
                if (res.data[id]) {
                    fn(null, res.data[id]);
                } else {
                    fn(new Error('No course has that ID!'));
                }
            }
        });
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

    _api.myEntries = function (id, fn) {
        get(url('allEntries'), {user: id}, fn);
    };

    _api.deactivateEntry = function (entry, fn) {
        post(url('editRequestUrl'), {id: entry._id, state: 'INACTIVE'}, fn);
    };

    _api.approvePairing = function (entry, fn) {
        post(url('editRequestUrl'), {id: entry._id, state: 'UNACCEPTED'}, fn);
    };

    _api.editRequest = function (entry, fn) {

    };

    _api.newPair = function (entry, fn) {
        post(url('newPairUrl'), {request: entry._id}, fn);
    };

    _api.notifyTutor = function (entry, fn) {
        post(url('notifyUserUrl'), {request: entry._id}, fn);
    };

    _api.signup = function(user, fn) {
        post(url('signupUrl'), user, fn);
    };

    _api.updateUser = function(userId, user, fn) {
        post(url('updateUser'))
    }
})();
