import { Database } from "sqlite3";
import DB from "../database/DB";
import Entry from "../entity/Entry";

const DictionaryService = {
  searchWord: (word: string): Promise<Entry[]> => {
    return new Promise((resolve, reject) => {
      const db: Database = DB.getInstance();
      const searchQuery = `SELECT * FROM entries WHERE word = ?`;
      const countQuery = `
          INSERT INTO count (word, count)
          VALUES (?, 1)
          ON CONFLICT(word) DO UPDATE SET count = count + 1;
        `;

      db.serialize(() => {
        db.all(searchQuery, [word], (err, rows) => {
          if (err) {
            console.error("Error executing search query:", err.message);
            reject(err);
            return;
          }
          const entries: Entry[] = rows.map(
            (row: { word: string; wordtype?: string; definition: string }) => {
              return new Entry(row.word, row.wordtype || "", row.definition);
            }
          );
          const updateCountPromises = entries.map((entry) => {
            return new Promise<void>((resolveCount, rejectCount) => {
              db.run(countQuery, [entry.getWord()], function (countErr) {
                if (countErr) {
                  console.error(
                    "Error executing count update query:",
                    countErr.message
                  );
                  rejectCount(countErr);
                  return;
                }
                console.log(
                  `Count for word "${entry.getWord()}" updated/added successfully.`
                );
                resolveCount();
              });
            });
          });
          Promise.all(updateCountPromises)
            .then(() => resolve(entries))
            .catch(reject);
        });
      });
    });
  },

  getTopSearches: (): Promise<Entry[]> => {
    return new Promise((resolve, reject) => {
      const db: Database = DB.getInstance();
      const topSearchesQuery = `
          SELECT e.word, e.wordtype, e.definition, c.count 
          FROM entries e
          JOIN count c ON e.word = c.word
          ORDER BY c.count DESC
          LIMIT 10;
        `;
      db.all(topSearchesQuery, [], (err, rows) => {
        if (err) {
          console.error("Error executing top searches query:", err.message);
          reject(err);
          return;
        }
        const entries: Entry[] = rows.map(
          (row: { word: string; wordtype?: string; definition: string }) => {
            return new Entry(row.word, row.wordtype || "", row.definition);
          }
        );
        resolve(entries);
      });
    });
  },
};

export default DictionaryService;
