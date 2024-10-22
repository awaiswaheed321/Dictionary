import { Request, Response, NextFunction } from "express";
import Entry from "../entity/Entry";
import DictionaryService from "../service/DictionaryService";
import Count from "../entity/Count";

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
