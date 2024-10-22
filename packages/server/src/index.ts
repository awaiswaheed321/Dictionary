import express from "express";
import DB from "./database/DB";
import ErrorHandlingMiddleware from "./middlewares/ErrorHandlingMiddleware";
import LoggerMiddleware from "./middlewares/LoggerMiddleware";
import DictionaryRouter from "./route/DictionaryRouter";
import Constants from "./constants/Constants";
import cors from "cors";

const app = express();
app.set("port", process.env.PORT || 3001);
const PORT = app.get("port");

DB.initialize();

app.use(cors());
app.use(express.json());

app.use(LoggerMiddleware);
app.use(Constants.API_BASE_PATH, DictionaryRouter);
app.use(ErrorHandlingMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

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
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  shutdown();
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  shutdown();
});
