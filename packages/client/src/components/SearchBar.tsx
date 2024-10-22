import { CircularProgress, Grid2 } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SearchBarProps } from "../interfaces/Interfaces";

export default function SearchBar(props: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setWord(e.target.value);
  };

  return (
    <Grid2 container spacing={2} alignItems="center">
      <Grid2>
        <TextField
          label="Enter text"
          variant="outlined"
          value={props.word}
          onChange={handleChange}
        />
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#9e2a2b",
            "&:hover": { backgroundColor: "#540b0e" },
          }}
          onClick={props.handleClick}
        >
          Search Word
        </Button>
      </Grid2>
      {props.isCircularOpen && <CircularProgress />}
    </Grid2>
  );
}
