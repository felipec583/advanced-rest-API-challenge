import * as jewelryModel from "../models/jewelryModels.js";
import { RequestError } from "../helpers/error.js";
import prepareHateoas from "../helpers/hateoas.js";
// Controlador para obtener joyas limitadas
const getJewelry = async (req, res, next) => {
    try {
        const reqQuery = req.query;
        const data = await jewelryModel.getLimited(reqQuery);
        // Preparar vínculos HATEOAS
        const hateoasDesign = await prepareHateoas(data);
        if (!data) {
            throw new RequestError(404, "Entity not found or it is empty");
        }
        res.status(200).json(hateoasDesign);
    }
    catch (error) {
        next(error);
    }
};
// Controlador para obtener joyas filtradas
const getFilteredJewelry = async (req, res, next) => {
    try {
        const reqQuery = req.query;
        const data = await jewelryModel.getFiltered(reqQuery);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
// Controlador para obtener una joya por su ID
const getOneJewelry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await jewelryModel.getOne(id);
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};
export { getJewelry, getFilteredJewelry, getOneJewelry };
