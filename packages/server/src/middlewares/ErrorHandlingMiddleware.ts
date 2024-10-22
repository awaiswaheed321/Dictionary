import ApiError from "../error/ApiError";
import { Request, Response, NextFunction } from "express";

const ErrorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default ErrorHandlingMiddleware;
