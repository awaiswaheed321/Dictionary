import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import * as React from "react";
import { AppContainerProps } from "../interfaces/Interfaces";

function ScrollTop(props: AppContainerProps) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default function AppContainer(props: AppContainerProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Main layout container with flexbox */}
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* AppBar at the top */}
        <AppBar sx={{ backgroundColor: "#335c67" }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              English Dictionary
            </Typography>
          </Toolbar>
        </AppBar>

        <Toolbar id="back-to-top-anchor" />

        {/* Main content container */}
        <Container sx={{ flexGrow: 1, my: 2 }}>
          {/* Children content will go here */}
          {props.children}
        </Container>

        {/* Footer at the bottom */}
        <AppBar
          position="static"
          sx={{ top: "auto", bottom: 0, backgroundColor: "#335C67" }}
        >
          <Toolbar>
            <Typography
              variant="body1"
              color="inherit"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              © 2024 English Dictionary. All rights reserved.
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Scroll-to-top button */}
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
