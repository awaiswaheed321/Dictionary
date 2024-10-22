import { Request, Response, NextFunction } from "express";

const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {
    originalUrl: url,
    method,
    headers: { host },
  } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${host}${url} called.`);
  next();
};

export default LoggerMiddleware;
