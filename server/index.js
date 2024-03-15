const express = require("express");
const cors = require("cors");

const {
  populateEmployeeDatabase,
} = require("./scripts/populateEmployeeDatabase");
const {
  connectToDb,
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./database");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: ["GET", "DELETE", "PUT", "POST"],
};

app.options("/api/employees/:id", cors(corsOptions));
app.options("/api/employees", cors(corsOptions));

app.get("/api/employees", cors(corsOptions), (req, res, next) => {
  try {
    connectToDb().then((db) => {
      getEmployees(db).then((employees) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(employees);
      });
    });
  } catch {
    console.error("Error fetching users:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/employees/:id", cors(corsOptions), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, profession, city, branch, code, color, assigned } = req.body;

    connectToDb().then(async (db) => {
      const updatedData = {
        name,
        profession,
        city,
        branch,
        code,
        color,
        assigned: Number(assigned),
      };

      await updateEmployee(db, id, updatedData);
      await getEmployees(db).then((employees) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(employees);
      });
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/employees", cors(corsOptions), async (req, res, next) => {
  console.log("new employee");
  try {
    const { name, code, profession, color, city, branch, assigned } = req.body;
    connectToDb().then(async (db) => {
      await createEmployee(db, {
        name,
        code,
        profession,
        color,
        city,
        branch,
        assigned,
      });
      await getEmployees(db).then((employees) => {
        res.setHeader("Content-Type", "application/json");
        res.status(201);
        res.json(employees);
      });
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(400).send("Error creating employee");
  }
});

app.delete("/api/employees/:id", cors(corsOptions), async (req, res, next) => {
  try {
    const id = req.params.id;

    connectToDb().then(async (db) => {
      await deleteEmployee(db, id);
      res.status(200).send("Employee deleted successfully");
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Internal Server Error");
  }
});

populateEmployeeDatabase().then(() => {
  app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
});
