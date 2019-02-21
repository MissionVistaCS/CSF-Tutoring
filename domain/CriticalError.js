'use strict';

/**
 * When this throws ErrorMgr will give a 401
 *
 * @param message
 * @param extra
 */
module.exports = function CriticalError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.extra = extra;
};

require('util').inherits(module.exports, RuntimeError);