import { Router } from "express";
import DictionaryController from "../controller/DictionaryController";

const DictionaryRouter = Router();

DictionaryRouter.route("/top").get(DictionaryController.getTopSearches);
DictionaryRouter.route("/:word").get(DictionaryController.searchWord);


export default DictionaryRouter;
