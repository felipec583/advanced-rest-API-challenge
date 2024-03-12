import express from "express";
import * as jewelryController from "../controllers/jewelryControllers.js";
const route = express.Router();

route.get("/", jewelryController.getJewelry);
route.get("/filtros", jewelryController.getFilteredJewelry);
route.get("/joya/:id", jewelryController.getOneJewelry);

export default route;
