import pool from "../config/database.js";
import format from "pg-format";
import { FilterParams } from "../types/types.js";
import createFilteredQuery from "../helpers/filter.js";
import { RequestError } from "../helpers/error.js";

// Obtener registros limitados con paginación y ordenamiento
const getLimited = async ({ limits = 3, page = 1, order_by = "id asc" }) => {
  let offset = (page - 1) * limits;

  const [field, order] = order_by.split("_");

  const sqlQuery = {
    text: format(
      "SELECT * from inventario ORDER BY %s %s LIMIT %s OFFSET %s",
      field,
      order,
      limits,
      offset
    ),
  };
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

// Obtener registros filtrados
const getFiltered = async ({ ...filter }: FilterParams) => {
  const { query, values } = await createFilteredQuery("inventario", filter);
  const sqlQuery = {
    text: query,
    values: values,
  };
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

// Obtener un solo registro por su ID
const getOne = async (id: string) => {
  const sqlQuery = {
    text: "SELECT * from inventario WHERE id = $1",
    values: [id],
  };
  const res = await pool.query(sqlQuery);
  if (res.rowCount === 0) throw new RequestError(404, "ID not found");
  return res.rows[0];
};
export { getFiltered, getLimited, getOne };
