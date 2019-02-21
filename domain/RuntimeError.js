'use strict';

module.exports = function RuntimeError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    if (message instanceof Error) {
        this.stack = message.stack;
    } else {
        this.message = message;
    }
    this.extra = extra;
};

require('util').inherits(module.exports, Error);