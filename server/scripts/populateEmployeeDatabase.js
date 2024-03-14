const fs = require("fs");
const { connectToDb, createEmployee } = require("../database");

const jsonData = fs.readFileSync(
  require.resolve("../data/employees.json"),
  "utf8"
);
const users = JSON.parse(jsonData);

async function populateEmployeeDatabase() {
  try {
    const db = await connectToDb();

    // Check if the 'employees' table exists
    const checkTableQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='employees'`;
    await new Promise((resolve, reject) => {
      db.get(checkTableQuery, (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          // Table doesn't exist, create it
          console.log('Table "employees" does not exist, creating it...');
          const createTableQuery = `
            CREATE TABLE employees (
              id INTEGER PRIMARY KEY,
              name TEXT,
              code TEXT,
              profession TEXT,
              color TEXT,
              city TEXT,
              branch TEXT,
              assigned INTEGER DEFAULT 0
            )
          `;
          db.run(createTableQuery, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('Table "employees" created successfully');
              for (const user of users) {
                createEmployee(db, user);
              }
              resolve();
            }
          });
        } else {
          console.log('Table "employees" already exists');
          resolve();
        }
      });
    });
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

module.exports = {
  populateEmployeeDatabase,
};
