import {
  Box,
  Card,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import Constants from "../Constants/Constants";
import { Count, TopSearchesProps } from "../interfaces/Interfaces";

export default function TopSearches(props: TopSearchesProps) {
  const [counts, setCounts] = useState<Count[]>([]);
  const [timer, setTimer] = useState(25);
  const [progress, setProgress] = useState(0);

  const getData = async () => {
    try {
      const url = new URL(
        `${Constants.BASE_PATH}${Constants.TOP_SEARCHES_URL}`,
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
        setCounts(data);
      } else {
        props.setSnackProps({
          message: "Error in fetching data",
          open: true,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        props.setSnackProps({
          message: `Fetch error: ${error.message}`,
          open: true,
        });
      } else {
        props.setSnackProps({
          message: `Fetch error: An unknown error occurred`,
          open: true,
        });
      }
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((t) => {
        if (t === 0) {
          getData();
          setProgress(0);
          return 25;
        }
        setProgress((prevProgress) => prevProgress + 4);
        return t - 1;
      });
    }, 1000);
    getData();
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Align items to the top
        height: "70vh", // Set the height to use the available viewport height
        padding: 0, // Remove padding from the container
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: 1, // Optional: Add some space below the title section
        }}
      >
        <Typography variant="h5" color="inherit" sx={{ paddingTop: "10px" }}>
          Top Searches
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // Align items vertically centered
            justifyContent: "center",
            marginTop: 1, // Space above the countdown
          }}
        >
          <Typography
            variant="subtitle2"
            color="inherit"
            sx={{ fontSize: "1.25rem", marginRight: 1 }}
          >
            Refresh In {timer} seconds
          </Typography>
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{ color: "#335C67" }}
          />
        </Box>
      </Container>

      <TableContainer
        component={Card}
        sx={{
          width: "100%",
          maxWidth: 900,
          overflowX: "auto", // Allow horizontal scrolling if needed
          overflowY: "auto", // Allow vertical scrolling if needed
          marginBottom: 2, // Add margin to the bottom of the table for spacing
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#335C67",
                  color: "#fff",
                  width: "20%",
                  padding: "10px", // Adjusted padding for cell height
                }}
              >
                Sr. #
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#335C67",
                  color: "#fff",
                  width: "40%",
                  padding: "10px", // Adjusted padding for cell height
                }}
              >
                Word
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "#335C67",
                  color: "#fff",
                  width: "40%",
                  padding: "10px", // Adjusted padding for cell height
                }}
              >
                Number of Searches
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {counts.map((count, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: index % 2 === 0 ? "#D3D3D3" : "#E0E0E0", // Alternate row colors
                }}
              >
                <TableCell
                  align="center"
                  sx={{ width: "10%", padding: "10px" }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ width: "45%", padding: "10px" }}
                >
                  {count.word.word}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ width: "45%", padding: "10px" }}
                >
                  {count.count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
