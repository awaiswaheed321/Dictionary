import { useState } from "react";
import "../css/App.css";
import AppContainer from "./AppContainer";
import SearchBar from "./SearchBar";

function App() {
  const [word, setWord] = useState("");

  const handleClick = () => {
    console.log(word);
  };
  return (
    <>
      <AppContainer>
        <SearchBar
          word={word}
          setWord={setWord}
          handleClick={handleClick}
        ></SearchBar>
      </AppContainer>
    </>
  );
}

export default App;
