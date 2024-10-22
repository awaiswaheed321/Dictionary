import { useState } from "react";
import "../css/App.css";
import AppContainer from "./AppContainer";
import SearchBar from "./SearchBar";
import TopSearches from "./TopSearches";
import Constants from "../Constants/Constants";
import SearchCard from "./SearchCard";

interface Entry {
  id: number;
  word: string;
  wordType: string;
  definition: string;
}

function App() {
  const [word, setWord] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const searchWord = async () => {
    try {
      const url = new URL(
        `${Constants.BASE_PATH}${Constants.SEARCH_WORD_URL}${word}`,
        Constants.HOST_NAME
      );
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(data);
        setIsCardOpen(true);
      } else {
        console.log("Error in fetching data");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Fetch error: ${error.message}`);
      } else {
        alert("Fetch error: An unknown error occurred");
      }
    }
  };

  const handleClick = () => {
    searchWord();
  };

  const closeCard = () => {
    setWord("");
    setIsCardOpen(false);
  };

  return (
    <>
      <AppContainer>
        <SearchBar word={word} setWord={setWord} handleClick={handleClick} />
        {isCardOpen && <SearchCard entries={entries} closeCard={closeCard} />}
        <TopSearches />
      </AppContainer>
    </>
  );
}

export default App;
