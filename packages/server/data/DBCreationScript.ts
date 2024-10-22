import * as fs from "fs/promises";
import { Database } from "sqlite3";

// Function to create the table and insert entries from a JSON file into SQLite
const insertEntriesFromJson = async (
  dbFilePath: string,
  jsonFilePath: string
) => {
  const db = new Database(dbFilePath, (err) => {
    if (err) {
      console.error("Could not open database:", err.message);
      return;
    }
    console.log("Connected to the SQLite database.");
  });

  try {
    // Step 1: Create the tables if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS entries (
        word TEXT NOT NULL,
        wordtype TEXT,
        definition TEXT NOT NULL
      );
    `;

    db.run(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating table Entries:", err.message);
        return;
      }
      console.log('Table "entries" is created or already exists.');
    });

    const createCountTableQuery = `
        CREATE TABLE IF NOT EXISTS count (
            word TEXT NOT NULL,
            count INTEGER
        );
    `;

    db.run(createCountTableQuery, (err) => {
      if (err) {
        console.error("Error creating table Count:", err.message);
        return;
      }
      console.log('Table "count" is created or already exists.');
    });

    // Step 2: Read the JSON file
    const jsonData = await fs.readFile(jsonFilePath, "utf8");

    // Step 3: Parse the JSON data
    const data = JSON.parse(jsonData);

    // Step 4: Begin a transaction for better performance
    db.serialize(() => {
      db.run("BEGIN TRANSACTION;");

      // Step 5: Prepare the insert statement
      const stmt = db.prepare(
        `INSERT INTO entries (word, wordtype, definition) VALUES (?, ?, ?);`
      );

      // Step 6: Iterate over the JSON entries and insert each into the database
      data.entries.forEach((entry: any) => {
        const word = entry.word;
        const wordtype = entry.wordtype || ""; // Default to empty string if not provided
        const definition = entry.definition;

        // Execute the prepared statement
        stmt.run(word, wordtype, definition, (err) => {
          if (err) {
            console.error("Error inserting data:", err.message);
          } else {
            console.log(`Inserted word: ${word}`);
          }
        });
      });

      // Step 7: Commit the transaction
      stmt.finalize();
      db.run("COMMIT;", (err) => {
        if (err) {
          console.error("Error committing transaction:", err.message);
        } else {
          console.log("Transaction committed.");
        }
      });
    });
  } catch (err) {
    console.error("Error reading or parsing JSON file:", err.message);
  } finally {
    // Step 8: Close the database connection
    db.close((err) => {
      if (err) {
        console.error("Could not close the database:", err.message);
      } else {
        console.log("Closed the database connection.");
      }
    });
  }
};
// Usage example
const dbFilePath = "./dictionary.db";
const jsonFilePath = "./englishdictionary.json";
insertEntriesFromJson(dbFilePath, jsonFilePath);
