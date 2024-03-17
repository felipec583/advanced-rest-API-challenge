import format from "pg-format";
import { IReqQuery } from "../types/types";

const fieldDictionary: IReqQuery = {
  precio_max: "precio <=",
  precio_min: "precio >=",
  metal: " metal =",
  categoria: "categoria =",
};

const dictionaryKeys = Object.keys(fieldDictionary);

type test = string | number;

const createFilteredQuery = async (entity: string, filters: IReqQuery) => {
  const table = entity.toLowerCase();
  let query = format("SELECT * FROM %I WHERE 1 = 1", table);

  //Comparación del diccionario con el objeto recibido del req.query
  const receivedFilters = Object.keys(filters).filter((filterKey) =>
    dictionaryKeys.includes(filterKey)
  );

  const values: test[] = [];
  if (receivedFilters.length > 0) {
    for (const key of receivedFilters) {
      query += ` AND ${fieldDictionary[key]} $${values.length + 1}`;
      values.push(filters[key]);
    }
  }

  return { query, values };
};

export default createFilteredQuery;
