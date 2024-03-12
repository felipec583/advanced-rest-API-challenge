class RequestError extends Error {
    constructor(statusCode, message, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.statusCode = statusCode;
        this.message = message;
        this.code = code;
        Object.setPrototypeOf(this, RequestError.prototype);
    }
}
class PgError extends RequestError {
    constructor(statusCode, message) {
        super(statusCode, message);
        this.psqlErrors = new Map([
            [
                "42601",
                { message: "Incorrect SQL statement. Check it out", status: 400 },
            ],
            [
                "23502",
                { message: "You should enter all the NOT NULL values", status: 400 },
            ],
            ["22P02", { message: "Stick to the correct data types", status: 400 }],
        ]);
        this.checkCode = (code) => {
            const errorMessage = this.psqlErrors.get(code);
            console.log(errorMessage);
            if (errorMessage) {
                this.message = errorMessage.message;
                this.statusCode = errorMessage.status;
            }
            else {
                this.message = this.message;
                this.statusCode = this.statusCode;
            }
        };
    }
}
const createPgError = (statusCode, message, code) => {
    const error = new PgError(statusCode, message);
    error.checkCode(code);
    return error;
};
export { RequestError, PgError, createPgError };
