import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
}

function ScrollTop(props: Props) {
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

export default function AppContainer(props: Props) {
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
