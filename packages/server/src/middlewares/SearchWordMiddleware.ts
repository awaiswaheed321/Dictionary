import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import Entry from "../entity/Entry";
import DictionaryService from "../service/DictionaryService";

const SearchWordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const word = req.params.word;
    if (!word) {
      throw new ApiError(400, "Send a word to search");
    }

    const entries: Entry[] = await DictionaryService.searchWord(word);

    if (entries.length === 0) {
      res.sendStatus(204);
    } else {
      res.status(200).json(entries);
    }
  } catch (error) {
    next(error);
  }
};

export default SearchWordMiddleware;
