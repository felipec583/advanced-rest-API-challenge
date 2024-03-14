import { Middleware } from "../types";

const ignoreFavicon: Middleware = (req, res, next) => {
  if (req.originalUrl.includes("favicon.ico")) {
    res.sendStatus(204);
  } else {
    next();
  }
};

export default ignoreFavicon;
