let BaseResponse = function (name, error, data) {
    this.name = name;
    this.data = data;
    this.code = 200;
    this.errors = [];
    if (error) {
        this.errors.push(error);
    }
};

BaseResponse.prototype.addError = function (error) {
    if (error instanceof Error) {
        this.errors.push(error);
    } else {
        this.errors.push(new RuntimeError('Something other than an error was added to BaseResponse.'));
    }
};

BaseResponse.prototype.hasErrors = function () {
    return this.errors.length > 0;
};

BaseResponse.prototype.toJSON = function () {
    return {
        name: this.name,
        code: this.code,
        data: this.data,
        errors: this.errors
    };
};

module.exports = BaseResponse;