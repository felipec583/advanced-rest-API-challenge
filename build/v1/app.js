import express from "express";
import cors from "cors";
import "dotenv/config";
import jewelryRoutes from "./routes/jewelryRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/joyas", jewelryRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT}`);
});
