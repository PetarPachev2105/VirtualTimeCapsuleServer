const httpStatus = require('http-status');

class AlabalaError extends Error {
    constructor(errorType, message) {
        // Calling parent constructor of base Error class.
        super(message);

        // Saving class name in the property of our custom error as a shortcut.
        this.name = 'AlabalaError';

        // Set the default HTTP status code to 500
        this.statusCode = errorType || 500;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        this.status = errorType || 'Lithium Error';
    }
}

const AlabalaErrorTypes = {
    MISSING_INPUTS: httpStatus.NOT_FOUND,
    BAD_INPUTS: httpStatus.NOT_FOUND,
    GENERAL: httpStatus.INTERNAL_SERVER_ERROR,
    DATA_NOT_FOUND: httpStatus.NOT_FOUND,
    UNAUTHORIZED: httpStatus.UNAUTHORIZED,
};

module.exports = {
    AlabalaError,
    AlabalaErrorTypes,
};