import SearchWordMiddleware from "../middlewares/SearchWordMiddleware";
import TopSearchesMiddleware from "../middlewares/TopSearchesMiddleware";

const DictionaryController = {
  searchWord: SearchWordMiddleware,
  getTopSearches: TopSearchesMiddleware,
};

export default DictionaryController;
