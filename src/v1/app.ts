import express from "express";
import cors from "cors";
import "dotenv/config";
import { logger } from "logger-express";
import jewelryRoutes from "./routes/jewelryRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import ignoreFavicon from "./middleware/ignoreFavicon.js";
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(
  logger({
    infoColor: "blue",
    colorize: true,
    errorColor: "yellowBright",
    logToFile: true,
  })
);
app.use(ignoreFavicon);

// Rutas
app.use("/joyas", jewelryRoutes);

// Manejo de errores
app.use(errorHandler);

// 404 Manejo de Not Found
app.get("*", (req, res, next) => {
  res.status(404).json({ Message: "This route does not exist" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
});
