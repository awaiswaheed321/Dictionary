import { useEffect, useState } from "react";
import Constants from "../Constants/Constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, Container, Typography } from "@mui/material";

export default function TopSearches() {
  interface Count {
    word: {
      id: number;
      word: string;
      wordType: string;
      definition: string;
    };
    count: number;
  }

  const [counts, setCounts] = useState<Count[]>([]);

  const getData = async () => {
    try {
      const url = new URL(
        `${Constants.BASE_PATH}${Constants.TOP_SEARCHES_URL}`,
        Constants.HOST_NAME
      );
      console.log(url);
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

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, 25000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h5" color="inherit" sx={{ marginBottom: 2 }}>
        Top Searches
      </Typography>
      <TableContainer
        component={Card}
        sx={{
          width: "100%",
          maxWidth: 900, // Increased width to make the table wider
          overflowX: "auto", // Allow horizontal scrolling
          overflowY: "auto", // Allow vertical scrolling
          maxHeight: "70vh", // Restrict the height to enable vertical scrolling if necessary
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#335C67", color: "#fff", width: "10%" }}
              >
                Sr. #
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#335C67", color: "#fff", width: "45%" }}
              >
                Word
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#335C67", color: "#fff", width: "45%" }}
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
                  backgroundColor: index % 2 === 0 ? "#D3D3D3" : "#E0E0E0  ", // Alternate row colors
                }}
              >
                <TableCell align="center" sx={{ width: "10%" }}>
                  {index + 1}
                </TableCell>
                <TableCell align="center" sx={{ width: "45%" }}>
                  {count.word.word}
                </TableCell>
                <TableCell align="center" sx={{ width: "45%" }}>
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
