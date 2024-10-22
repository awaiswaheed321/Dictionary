import { useState } from "react";
import "../css/App.css";
import AppContainer from "./AppContainer";
import SearchBar from "./SearchBar";
import TopSearches from "./TopSearches";

function App() {
  const [word, setWord] = useState("");

  const handleClick = () => {
    console.log(word);
  };
  return (
    <>
      <AppContainer>
        <SearchBar word={word} setWord={setWord} handleClick={handleClick} />
        <TopSearches />
      </AppContainer>
    </>
  );
}

export default App;
