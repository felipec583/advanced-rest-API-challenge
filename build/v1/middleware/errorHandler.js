import { RequestError, createPgError } from "../helpers/error.js";
const errorHandler = (err, req, res, next) => {
    if (err instanceof RequestError) {
        res.status(err.statusCode).json({ Message: err.message });
    }
    const error = createPgError(500, "");
    error.checkCode(err.code);
    res.status(error.statusCode).json({ Message: error.message });
    next();
};
export { errorHandler };
