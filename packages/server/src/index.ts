import express from "express";
import DB from "./database/DB";

const app = express();
const PORT = 3001;

// Initialize the database connection when the server starts
DB.initialize();

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Close the database connection when the server shuts down
const shutdown = () => {
  console.log("Shutting down...");
  DB.close();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

// Handle termination signals (Ctrl+C or kill command)
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Optional: Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown();
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  shutdown();
});
