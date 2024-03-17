import { Request, Response, NextFunction } from "express";

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | any;

type ErrorHandlerT = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => Response<any, Record<string, any>> | undefined;

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

interface IReqQuery {
  [key: string]: string | number;
}

interface FilterParams {
  precio_max?: number;
  precio_min?: number;
  metal?: string;
  categoria?: string;
}

interface JewelryStockI {
  id: number;
  nombre: string;
  categoria: string;
  metal: string;
  precio: number;
  stock: number;
}

type Fields = "precio_max" | "precio_min" | "categoria" | "metal";

interface QueryFilters {
  operator: string;
  value: string | number;
}

interface errorCont {
  message: string;
  status: number;
}
export {
  IReqQuery,
  Middleware,
  ControllerType,
  ErrorHandlerT,
  JewelryStockI,
  Fields,
  QueryFilters,
  FilterParams,
  errorCont,
};
