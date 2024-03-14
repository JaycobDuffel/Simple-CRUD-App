const express = require("express");
const cors = require("cors");

const {
  populateEmployeeDatabase,
} = require("./scripts/populateEmployeeDatabase");
const {
  connectToDb,
  getEmployees,
  createUser,
  updateUser,
  deleteUser,
} = require("./database");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.get("/api/employees", cors(corsOptions), (req, res, next) => {
  console.log("/api/employeeeeees");
  try {
    connectToDb().then((db) => {
      getEmployees(db).then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(users);
      });
    });
  } catch {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/api/employees/:id", cors(corsOptions), async (req, res, next) => {
  console.log("/api/employees/:id");
  const employeeId = parseInt(req.params.id); // Extract ID from request parameters
  try {
    const db = await connectToDb();
    const user = await getEmployee(db, employeeId);
    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(user);
    } else {
      res.status(404).send('Employee not found'); // Use a more specific status code for not found
    }
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).send('Internal Server Error');
  }
});

populateEmployeeDatabase().then(() => {
  app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
});
