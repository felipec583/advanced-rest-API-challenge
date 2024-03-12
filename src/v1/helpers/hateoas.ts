import { JewelryStockI } from "../types";

const prepareHateoas = async (data: JewelryStockI[]) => {
  const results = data.map((jewelry) => {
    return {
      name: jewelry.nombre,
      href: `/joyas/joya/${jewelry.id}`,
    };
  });

  const totalJoyas = data.length;
  const stockTotal = data.reduce((acc, cur) => (acc += cur.stock), 0);

  return { totalJoyas, stockTotal, results };
};

export default prepareHateoas;
