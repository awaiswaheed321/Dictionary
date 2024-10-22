import { NextFunction, Request, Response } from "express";

const ResponseLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;
  res.send = function (body: any) {
    console.log("Outgoing response:", {
      statusCode: res.statusCode,
      body: body,
    });
    return originalSend.call(this, body);
  };
  next();
};

export default ResponseLoggerMiddleware;
