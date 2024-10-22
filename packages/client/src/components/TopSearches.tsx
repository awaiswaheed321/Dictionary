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
  const [timer, setTimer] = useState(25);

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
    const timerInterval = setInterval(() => {
      setTimer((t) => {
        if (t === 0) {
          getData();
          return 25;
        }
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
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="inherit">
          Top Searches
          <Typography variant="subtitle2" color="inherit">
            Refresh In {timer} seconds
          </Typography>
        </Typography>
      </Container>

      <TableContainer
        component={Card}
        sx={{
          width: "100%",
          maxWidth: 900,
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "70vh",
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#335C67", color: "#fff", width: "20%" }}
              >
                Sr. #
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#335C67", color: "#fff", width: "40%" }}
              >
                Word
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "#335C67", color: "#fff", width: "40%" }}
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
