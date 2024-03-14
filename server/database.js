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
  console.log("in getEmployees");
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT * FROM employees";
    db.all(selectQuery, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const employees = rows.map((row) => {
          // Convert boolean values (0 or 1) to actual booleans
          row.assigned = Boolean(row.assigned);
          return row;
        });
        console.log("employees");
        resolve(employees);
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
        resolve(row);
      }
    });
  });
}

function deleteEmployee(db, id) {
  return new Promise((resolve, reject) => {
    const deleteQuery = "DELETE FROM employees WHERE id = ?";
    db.run(deleteQuery, [id], (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Employee with ID ${id} deleted successfully`);
        resolve();
      }
    });
  });
}

function createEmployee(db, user) {
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

function updateEmployee(db, id, updatedData) {
  return new Promise((resolve, reject) => {
    const updateQuery = `
      UPDATE employees
      SET name = ?, code = ?, profession = ?, color = ?, city = ?, branch = ?, assigned = ?
      WHERE id = ?
    `;

    db.run(
      updateQuery,
      [
        updatedData.name,
        updatedData.code,
        updatedData.profession,
        updatedData.color,
        updatedData.city,
        updatedData.branch,
        Number(updatedData.assigned), // Handle boolean conversion
        id,
      ],
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Employee with ID ${id} updated successfully`);
          resolve();
        }
      }
    );
  });
}

module.exports = {
  connectToDb,
  deleteEmployee,
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
};
