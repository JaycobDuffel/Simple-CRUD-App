import React, { useState } from "react";

import "./App.css";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import UpdateEmployeeMenu from "./components/UpdateEmployeeMenu/UpdateEmployeeMenu";
import CreateEmployeeForm from "./components/CreateEmployeeForm/CreateEmployeeForm";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [updateEmployeeMenuBGColor, setUpdateEmployeeMenuBGColor] =
    useState("#fff");

  return (
    <div className="App">
      <h1>Plexxis Employees</h1>
      <div className="main">
        <div>
          <EmployeeTable
            employees={employees}
            setEmployees={setEmployees}
            setSelectedEmployee={setSelectedEmployee}
            setUpdateEmployeeMenuBGColor={setUpdateEmployeeMenuBGColor}
          />
        </div>
        <div className="employeeDisplay">
          <CreateEmployeeForm setEmployees={setEmployees} />
          <UpdateEmployeeMenu
            setEmployees={setEmployees}
            setSelectedEmployee={setSelectedEmployee}
            selectedEmployee={selectedEmployee}
            updateEmployeeMenuBGColor={updateEmployeeMenuBGColor}
            setUpdateEmployeeMenuBGColor={setUpdateEmployeeMenuBGColor}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
