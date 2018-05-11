'use strict';

/**
 * When this throws ErrorMgr will send back response (400 error)
 *
 * @param message
 * @param extra
 */
module.exports = function PermissionError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
};

require('util').inherits(module.exports, UserError);