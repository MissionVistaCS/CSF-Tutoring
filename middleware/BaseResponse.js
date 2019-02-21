const INTERNAL_SERVER_ERROR = 500;
const FORBIDDEN = 403;
const BAD_REQUEST = 400;

//TODO put this in service
const handleErrors = function (baseResponse, overrideCode) {
    let promErr;

    const resetResponse = function (name, error, code) {
        baseResponse.name = name;
        baseResponse.errors.length = 0;
        baseResponse.data = "";
        baseResponse.errors.push(error);
        baseResponse.code = code;
    };

    /**`
     * Find the prominent error. If there's a runtime error or permission error that will take precidence over user errors.
     */
    baseResponse.errors.forEach(function (error) {

        if (error instanceof RuntimeError || (error instanceof Error && !(error instanceof RuntimeError) && !(error instanceof UserError))) {

            promErr = error;

        } else if (error instanceof PermissionError && !(promErr instanceof RuntimeError)) {

            promErr = error;

        } else if (error instanceof UserError && !(error instanceof PermissionError) && !(promErr instanceof PermissionError) && !(promErr instanceof RuntimeError)) {

            promErr = error;

        } else if (!(promErr instanceof RuntimeError) && !(promErr instanceof PermissionError) && !(promErr instanceof UserError)) {

            promErr = error;

        }
    });

    /**
     * If user has no permission or server goofed up, all other errors and data should be deleted to
     * give user no unneeded information.
     */
    if (promErr !== null && promErr !== undefined) {

        if (promErr instanceof RuntimeError) {

            console.error(promErr);
            resetResponse('Internal server error', new RuntimeError('Internal server error'), INTERNAL_SERVER_ERROR);
        } else if (promErr instanceof PermissionError) {

            console.debug('User attempted action without permission: ' + promErr.message);
            resetResponse('Invalid permissions', new PermissionError('Invalid permissions for this resource'), FORBIDDEN);
        } else if (promErr instanceof UserError) {

            console.debug('User made an error: ' + promErr.message);
            baseResponse.code = BAD_REQUEST;
        } else {

            console.error(promErr);
            resetResponse('Internal server error', new RuntimeError('Internal server error'), INTERNAL_SERVER_ERROR);
        }
    }

    if (overrideCode) {
        baseResponse.code = overrideCode;
    }
};


module.exports = function (req, res, next) {
    /**
     *
     * @param name           name of response (can be a BaseResponse)
     * @param error          a single error to add to BaseResponse (can be an override code if name is BaseResponse)
     * @param data           data to add
     * @param overrideCode   response code
     */
    res.sendBaseResponse = function (name, error, data, overrideCode) { //Can pass in a BaseResponse object too
        let baseResponse = null;
        if (!(name instanceof BaseResponse) && typeof name === 'string') {
            baseResponse = new BaseResponse(name, error, data);
        } else if (name instanceof BaseResponse) {
            baseResponse = name;
            overrideCode = error; //Error will be override code in this instance
        }
        handleErrors(baseResponse, overrideCode);
        res.status(baseResponse.code);
        console.debug('Sent baseResponse: ' + JSON.stringify(baseResponse.toJSON()));
        res.json(baseResponse.toJSON());
    };

    /**
     *
     * @param NAME
     * @param errMsg
     * @param err
     * @param result
     * @returns {boolean} if there was a problem with the request
     */
    res.handleResult = function (NAME, err, result, errMsg) {
        if (err) {
            res.sendBaseResponse(NAME, err);
            return true;
        }

        if (!result) {
            res.sendBaseResponse(NAME, new UserError(errMsg));
            return true;
        }

        return false;
    };

    /**
     *
     * @param NAME
     * @param err
     * @param perm
     * @returns {boolean} if user doesn't have the permission
     */
    res.handlePerm = function (NAME, err, perm, permMsg) {
        if (err) {
            res.sendBaseResponse(NAME, err);
            return true;
        }

        if (!perm) {
            res.sendBaseResponse(NAME, new PermissionError(permMsg ? permMsg : _strings.get('errors.permissions')));
            return true;
        }

        return false;
    };

    next();
};