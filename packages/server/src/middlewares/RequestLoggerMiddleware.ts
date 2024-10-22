import { NextFunction, Request, Response } from "express";

const RequestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {
    originalUrl: url,
    method,
    headers: { host },
  } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${host}${url} called.`);
  next();
};

export default RequestLoggerMiddleware;
