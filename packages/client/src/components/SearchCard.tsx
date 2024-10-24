import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SearchCardProps } from "../interfaces/Interfaces";

export default function WordCard({ entries, closeCard }: SearchCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next entry
  const nextEntry = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < entries.length ? prevIndex + 1 : prevIndex
    );
  };

  // Function to go to the previous entry
  const prevEntry = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const wordData = entries[currentIndex];

  return (
    <Card
      sx={{
        minWidth: 275,
        position: "relative",
        backgroundColor: "background.paper",
        bgcolor: "#E0E0E0",
        color: "black",
        marginTop: 2,
      }}
    >
      {/* Close Button */}
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={closeCard}
      >
        <CloseIcon />
      </IconButton>

      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Word of the Day
        </Typography>

        {/* Word */}
        <Typography variant="h5" component="div">
          {wordData.word}
        </Typography>

        {/* Word Type */}
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {wordData.wordType}
        </Typography>

        {/* Definition */}
        <Typography variant="body2">{wordData.definition}</Typography>
      </CardContent>

      <CardActions>
        {/* Previous Button */}
        <Button size="small" onClick={prevEntry} disabled={currentIndex === 0}>
          Previous
        </Button>
        {/* Next Button */}
        <Button
          size="small"
          onClick={nextEntry}
          disabled={currentIndex >= entries.length - 1}
        >
          Next
        </Button>
      </CardActions>

      {/* Result Count */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          color: "grey",
          fontSize: 12,
        }}
      >
        {`${currentIndex + 1} of ${entries.length} ${
          entries.length === 1 ? "result" : "results"
        }`}
      </Typography>
    </Card>
  );
}
