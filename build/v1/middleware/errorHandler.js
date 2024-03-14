import { RequestError, createPgError } from "../helpers/error.js";
const errorHandler = (err, req, res, next) => {
    if (err instanceof RequestError) {
        return res.status(err.statusCode).send({ Message: err.message });
    }
    else {
        const error = createPgError(500, "");
        error.checkCode(err.code);
        res.status(error.statusCode).send({ Message: error.message });
    }
    next();
};
export { errorHandler };
