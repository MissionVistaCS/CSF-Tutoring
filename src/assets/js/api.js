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
        allUsers: 'api/list-users',
        editRequestUrl: 'api/edit-request',
        newPairUrl: 'api/new-pair',
        manualPairUrl: 'api/manual-pair',
        notifyUserUrl: 'api/notify-user',
        signupUrl: 'api/signup',
        editUserUrl: 'api/edituser',
        getUserUrl: 'api/get-user',
        newEntryUrl: 'api/submit-tutor-request'
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

    _api.allUsers = function (fn) {
        get(url('allUsers'), {}, fn);
    };

    _api.myEntries = function (id, fn) {
        get(url('allEntries'), {user: id}, fn);
    };

    _api.deactivateEntry = function (entry, fn) {
        post(url('editRequestUrl'), {id: entry._id, state: 'INACTIVE'}, fn);
    };

    _api.verifyEntry = function (user, fn) {
        post(url('editUserUrl'), {_id: user._id, verified: true}, fn);
    };

    _api.approvePairing = function (entry, fn) {
        post(url('editRequestUrl'), {id: entry._id, state: 'UNACCEPTED'}, fn);
    };

    _api.editRequest = function (entry, fn) {

    };

    _api.newPair = function (entry, fn) {
        post(url('newPairUrl'), {request: entry._id}, fn);
    };

    _api.manualPair = function (entry, user, fn) {
        post(url('manualPairUrl'), {entry: entry._id, user: user._id}, fn);
    };

    _api.notifyTutor = function (entry, fn) {
        post(url('notifyUserUrl'), {request: entry._id}, fn);
    };

    _api.signup = function (user, fn) {
        post(url('signupUrl'), user, fn);
    };

    _api.editUser = function (user, fn) {
        post(url('editUserUrl'), user, fn);
    };

    _api.getUser = function (id, fn) {
        get(url('getUserUrl'), {_id: id}, fn);
    };

    _api.newRequest = function (request, fn) {
        post(url('newEntryUrl'), request, fn);
    };
})();
