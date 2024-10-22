import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid2 } from "@mui/material";

interface Props {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
}

export default function SearchBar(props: Props) {
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
    </Grid2>
  );
}
