import { Database } from "sqlite3";
import Constants from "../constants/Constants";
import { join } from "path";

class DB {
  private static instance: Database | null = null;

  private constructor() {}

  // Initialize the database connection
  public static initialize(): void {
    if (!DB.instance) {
      const dbPath = join(__dirname, Constants.DATABASE_FILE_PATH);
      console.log(dbPath);
      DB.instance = new Database(dbPath, (err) => {
        if (err) {
          console.error("Could not open database:", err.message);
        } else {
          console.log("Connected to the SQLite database.");
        }
      });
    }
  }

  // Get the database instance
  public static getInstance(): Database {
    if (!DB.instance) {
      throw new Error("Database not initialized. Call DB.initialize() first.");
    }
    return DB.instance;
  }

  // Close the database connection
  public static close(): void {
    if (DB.instance) {
      DB.instance.close((err) => {
        if (err) {
          console.error("Could not close the database:", err.message);
        } else {
          console.log("Closed the database connection.");
        }
      });
      DB.instance = null; // Reset instance on close
    }
  }
}

export default DB;
