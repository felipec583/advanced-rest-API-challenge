import format from "pg-format";
const fieldDictionary = {
    precio_max: "precio <=",
    precio_min: "precio >=",
    metal: " metal =",
    categoria: "categoria =",
};
const dictionaryKeys = Object.keys(fieldDictionary);
const createFilteredQuery = async (entity, filters) => {
    const table = entity.toLowerCase();
    let query = format("SELECT * FROM %I WHERE 1 = 1", table);
    const receivedFilters = Object.keys(filters).filter((filterKey) => dictionaryKeys.includes(filterKey));
    const values = [];
    if (receivedFilters.length > 0) {
        for (const key of receivedFilters) {
            query += ` AND ${fieldDictionary[key]} $${values.length + 1}`;
            values.push(filters[key]);
        }
    }
    return { query, values };
};
export default createFilteredQuery;
