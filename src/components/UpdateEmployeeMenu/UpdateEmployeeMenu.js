import React, { useState } from "react";
import axios from "axios";

import "./UpdateEmployeeMenu.css";
import UpdateEmployeeRadio from "./UpdateEmployeeRadio";

const UpdateEmployeeMenu = ({
  setEmployees,
  selectedEmployee,
  setSelectedEmployee,
  updateEmployeeMenuBGColor,
  setUpdateEmployeeMenuBGColor,
}) => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleSaveChanges = async () => {
    setSaveSuccess(false);

    try {
      const response = await axios.put(
        `http://localhost:8080/api/employees/${selectedEmployee.id}`,
        { ...selectedEmployee }
      );
      setEmployees(response.data);
      setUpdateEmployeeMenuBGColor(selectedEmployee.color);

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    setDeleteSuccess(false);
    try {
      await axios.delete(`http://localhost:8080/api/employees/${employeeId}`);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);

      const response = await axios.get("http://localhost:8080/api/employees");
      setEmployees(response.data);
      setSelectedEmployee();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <>
      {selectedEmployee ? (
        <div
          className="selectedEmployee"
          style={{ backgroundColor: updateEmployeeMenuBGColor }}
        >
          <h2>Employee Details</h2>
          {Object.keys(selectedEmployee).map((key) => (
            <div key={key}>
              {key === "assigned" ? (
                <>
                  <label htmlFor="assigned">Assigned:</label>
                  <UpdateEmployeeRadio
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                  />
                </>
              ) : (
                <div key={key}>
                  <label htmlFor={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                  </label>
                  {key === "id" ? (
                    <input
                      type="text"
                      id={key}
                      value={selectedEmployee[key]}
                      disabled={true}
                    />
                  ) : (
                    <input
                      type="text"
                      id={key}
                      value={selectedEmployee[key]}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          [e.target.id]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              )}
            </div>
          ))}
          {saveSuccess && <p>Changes saved successfully!</p>}
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={() => handleDelete(selectedEmployee.id)}>
            Delete Employee
          </button>
        </div>
      ) : (
        <div>
          <h1>Please select an employee from the table.</h1>
          {deleteSuccess && <p>Employee deleted successfully!</p>}
        </div>
      )}
    </>
  );
};

export default UpdateEmployeeMenu;
