import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import React, { useState } from "react";
import Constants from "../Constants/Constants";
import { Entry, SnackProps } from "../interfaces/Interfaces";
import AppContainer from "./AppContainer";
import SearchBar from "./SearchBar";
import SearchCard from "./SearchCard";
import TopSearches from "./TopSearches";

function App() {
  const [word, setWord] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isCircularOpen, setIsCircularOpen] = useState(false);
  const [snackProps, setSnackProps] = useState<SnackProps>({
    open: false,
    message: "",
  });

  const searchWord = async () => {
    try {
      if (word.trim() === "") {
        setSnackProps({
          message: "Kindly enter a word to search",
          open: true,
        });
        return;
      }
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
        let msg = "";
        if (response.status === 400 || response.status === 404) {
          const body = await response.json();
          msg = body.message;
        } else {
          msg = "Error in fetching response.";
        }
        setSnackProps({
          message: msg,
          open: true,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSnackProps({
          message: `Fetch error: ${error.message}`,
          open: true,
        });
      } else {
        setSnackProps({
          message: `Fetch error: An unknown error occurred`,
          open: true,
        });
      }
    } finally {
      setIsCircularOpen(false);
    }
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleClick = async () => {
    setIsCircularOpen(true);
    await delay(250);
    searchWord();
  };

  const closeCard = () => {
    setWord("");
    setIsCardOpen(false);
  };

  const handleSnackBarClose = () => {
    setSnackProps({ ...snackProps, open: false });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <>
      <AppContainer>
        <SearchBar
          word={word}
          setWord={setWord}
          handleClick={handleClick}
          isCircularOpen={isCircularOpen}
        />
        {isCardOpen && <SearchCard entries={entries} closeCard={closeCard} />}
        <TopSearches setSnackProps={setSnackProps} />
        <Snackbar
          open={snackProps.open}
          onClose={handleSnackBarClose}
          action={action}
          TransitionComponent={SlideTransition}
          autoHideDuration={3000}
        >
          <Alert
            onClose={handleSnackBarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackProps.message}
          </Alert>
        </Snackbar>
      </AppContainer>
    </>
  );
}

export default App;
