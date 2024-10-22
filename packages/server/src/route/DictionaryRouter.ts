import { Router } from "express";
import DictionaryController from "../controller/DictionaryController";

const DictionaryRouter = Router();

DictionaryRouter.route("/:word").get(DictionaryController.searchWord);
DictionaryRouter.route("/top").get(DictionaryController.getTopSearches);

export default DictionaryRouter;
