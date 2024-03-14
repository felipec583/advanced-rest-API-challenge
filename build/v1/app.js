import express from "express";
import cors from "cors";
import "dotenv/config";
import { logger } from "logger-express";
import jewelryRoutes from "./routes/jewelryRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import ignoreFavicon from "./middleware/ignoreFavicon.js";
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(logger({
    infoColor: "blue",
    colorize: true,
    errorColor: "yellowBright",
    logToFile: true,
}));
app.use(ignoreFavicon);
app.use("/joyas", jewelryRoutes);
app.use(errorHandler);
app.get("*", (req, res, next) => {
    res.status(404).json({ Message: "This route does not exist" });
});
app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT}`);
});
