import express from "express";
import * as jewelryController from "../controllers/jewelryControllers.js";

const route = express.Router();

// Ruta para obtener todas las joyas
route.get("/", jewelryController.getJewelry);

// Ruta para obtener joyas filtradas
route.get("/filtros", jewelryController.getFilteredJewelry);

// Ruta para obtener una joya por su ID
route.get("/joya/:id", jewelryController.getOneJewelry);

export default route;
