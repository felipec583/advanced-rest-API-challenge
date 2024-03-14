import { ControllerType, IReqQuery } from "../types";
import * as jewelryModel from "../models/jewelryModels.js";
import { RequestError } from "../helpers/error.js";
import prepareHateoas from "../helpers/hateoas.js";

const getJewelry: ControllerType = async (req, res, next) => {
  try {
    const reqQuery = req.query;
    const data = await jewelryModel.getLimited(reqQuery);
    const hateoasDesign = await prepareHateoas(data);

    if (!data) {
      throw new RequestError(404, "Entity not found or it is empty");
    }
    res.status(200).json(hateoasDesign);
  } catch (error) {
    next(error);
  }
};

const getFilteredJewelry: ControllerType = async (req, res, next) => {
  try {
    const reqQuery = req.query as IReqQuery;
    const data = await jewelryModel.getFilered(reqQuery);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getOneJewelry: ControllerType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await jewelryModel.getOne(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export { getJewelry, getFilteredJewelry, getOneJewelry };
