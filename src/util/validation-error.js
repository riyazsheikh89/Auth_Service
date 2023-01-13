const AppError = require('./error-handler');
const {StatusCodes} = require('http-status-codes');

class ValidationError extends AppError {
    constructor(error) {
        let errorName = error.name;
        let explanation = [];

        error.errors.forEach((obj) => {
            explanation.push(obj.message);
        });

        super (
            errorName,
            "Not able to validate the data sent in the request",
            explanation,
            StatusCodes.BAD_REQUEST
        )
    }
}


module.exports = ValidationError