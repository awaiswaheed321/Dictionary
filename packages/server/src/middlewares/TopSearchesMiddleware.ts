import { NextFunction, Request, Response } from "express";
import Count from "../entity/Count";
import DictionaryService from "../service/DictionaryService";

const TopSearchesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topEntries: Count[] = await DictionaryService.getTopSearches();

    if (topEntries.length === 0) {
      res.sendStatus(204);
    } else {
      res.status(200).json(topEntries);
    }
  } catch (error) {
    next(error);
  }
};

export default TopSearchesMiddleware;
