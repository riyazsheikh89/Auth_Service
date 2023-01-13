const {StatusCodes} = require('http-status-codes');
class AppError extends Error {
    constructor (
        name = 'App Error',
        message = 'Something went wrong',
        explanation = 'Something went wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        ) {
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}


module.exports = AppError;