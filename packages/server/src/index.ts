import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import Constants from "./constants/Constants";
import DB from "./database/DB";
import ErrorHandlingMiddleware from "./middlewares/ErrorHandlingMiddleware";
import RequestLoggerMiddleware from "./middlewares/RequestLoggerMiddleware";
import ResponseLoggerMiddleware from "./middlewares/ResponseLoggerMiddleware";
import DictionaryRouter from "./route/DictionaryRouter";
import SwaggerOptions from "./swagger/SwaggerOptions";
import dotenv from "dotenv";

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

const swaggerDocs = swaggerJsdoc(SwaggerOptions);

const app = express();
app.set("port", process.env.PORT || 3001);
const PORT = app.get("port");

DB.initialize();

app.use(limiter);

const frontendIP = process.env.FRONTEND_IP;
if (frontendIP) {
  app.use(
    cors({
      origin: frontendIP,
    })
  );
} else {
  app.use(cors());
}

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(RequestLoggerMiddleware);
app.use(ResponseLoggerMiddleware);
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
