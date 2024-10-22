import { Database } from "sqlite3";
import DB from "../database/DB";
import Entry from "../entity/Entry";
import Count from "../entity/Count";

const DictionaryService = {
  searchWord: (word: string): Promise<Entry[]> => {
    return new Promise((resolve, reject) => {
      const db: Database = DB.getInstance();
      const searchQuery = `SELECT * FROM entries WHERE LOWER(word) = LOWER(?);`;
      const countQuery = `
          INSERT INTO count (id, count)
          VALUES (?, 1)
          ON CONFLICT(id) DO UPDATE SET count = count + 1;
        `;

      db.serialize(() => {
        db.all(searchQuery, [word], (err, rows) => {
          if (err) {
            console.error("Error executing search query:", err.message);
            reject(err);
            return;
          }
          const entries: Entry[] = rows.map(
            (row: {
              id: number;
              word: string;
              wordtype?: string;
              definition: string;
            }) => {
              return new Entry(
                row.id,
                row.word,
                row.wordtype || "",
                row.definition
              );
            }
          );

          const updateCountPromises = entries.map((entry) => {
            return new Promise<void>((resolveCount, rejectCount) => {
              db.run(countQuery, [entry.getId()], function (countErr) {
                // Pass entry ID instead of word
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

  getTopSearches: (): Promise<Count[]> => {
    return new Promise((resolve, reject) => {
      const db: Database = DB.getInstance();
      const topSearchesQuery = `
          SELECT e.id, e.word, e.wordtype, e.definition, c.count 
          FROM entries e
          JOIN count c ON e.id = c.id
          ORDER BY c.count DESC
          LIMIT 10;
        `;
      db.all(topSearchesQuery, [], (err, rows) => {
        if (err) {
          console.error("Error executing top searches query:", err.message);
          reject(err);
          return;
        }
        const counts: Count[] = rows.map(
          (row: {
            id: number;
            word: string;
            wordtype?: string;
            definition: string;
            count: number;
          }) => {
            return new Count(
              new Entry(row.id, row.word, row.wordtype || "", row.definition),
              row.count
            );
          }
        );
        resolve(counts);
      });
    });
  },
};

export default DictionaryService;
