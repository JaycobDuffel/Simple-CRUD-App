const sqlite3 = require("sqlite3").verbose();

function connectToDb(dbName = "employees.db") {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbName, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Connected to SQLite database:", dbName);
        resolve(db);
      }
    });
  });
}

function getEmployees(db) {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT * FROM employees";
    db.all(selectQuery, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function getEmployee(db, userId) {
  return new Promise((resolve, reject) => {
    const selectQuery = `SELECT * FROM employees WHERE id = ?`;
    db.get(selectQuery, [userId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // Resolve with the user object (or null if not found)
      }
    });
  });
}

function deleteUser(db, userId) {
  return new Promise((resolve, reject) => {
    const deleteQuery = `DELETE FROM employees WHERE id = ?`;
    db.run(deleteQuery, [userId], (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`User with ID ${userId} deleted successfully`);
        resolve();
      }
    });
  });
}

function createUser(db, user) {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO employees (name, code, profession, color, city, branch, assigned)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(
      insertQuery,
      [
        user.name,
        user.code,
        user.profession,
        user.color,
        user.city,
        user.branch,
        Number(user.assigned), // Converts boolean to 1 or 0
      ],
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`User with name '${user.name}' created successfully`);
          resolve();
        }
      }
    );
  });
}

function updateUser(db, userId, updateData) {
  return new Promise((resolve, reject) => {
    const SET_CLAUSE_PARTS = [];
    const queryParams = [];

    // Dynamically build SET clause based on updateData properties
    for (const key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        SET_CLAUSE_PARTS.push(`${key} = ?`);
        queryParams.push(updateData[key]);
      }
    }

    // Construct the final UPDATE query
    const updateQuery = `
      UPDATE employees
      SET ${SET_CLAUSE_PARTS.join(", ")}
      WHERE id = ?
    `;
    queryParams.push(userId); // Add userId as the last parameter

    db.run(updateQuery, queryParams, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`User with ID ${userId} updated successfully`);
        resolve();
      }
    });
  });
}

module.exports = {
  connectToDb,
  deleteUser,
  createUser,
  getEmployees,
  getEmployee,
  updateUser,
};
