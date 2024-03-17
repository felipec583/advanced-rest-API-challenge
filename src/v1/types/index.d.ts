declare module "logger-express" {
  import { Request, Response, NextFunction } from "express";

  interface LoggerOptions {
    logToFile?: boolean;
    sizeLogFile?: number;
    colorize?: boolean;
    infoColor?: string;
    errorColor?: string;
  }

  type LoggerMiddleware = (
    options?: LoggerOptions
  ) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

  const logger: LoggerMiddleware;

  export {logger}
}
