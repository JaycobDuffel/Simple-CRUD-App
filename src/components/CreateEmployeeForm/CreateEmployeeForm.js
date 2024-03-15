import React, { useState } from "react";
import axios from "axios";

import "./CreateEmployeeForm.css";

const CreateEmployeeForm = ({ setEmployees }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [color, setColor] = useState("");
  const [branch, setBranch] = useState("");
  const [assigned, setAssigned] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEmployeeData = {
      name,
      code,
      profession,
      city,
      color,
      branch,
      assigned,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/employees",
        newEmployeeData
      );
      console.log(response.data);
      setName("");
      setCode("");
      setProfession("");
      setCity("");
      setColor("");
      setBranch("");
      setAssigned(false);
      setShowForm(false);

      setEmployees(response.data);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="formContainer">
      <button className="toggleFormButton" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close Form" : "Create New Employee"}
      </button>
      {showForm && (
        <form className="formFields" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <label htmlFor="profession">Profession:</label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor="color">Color:</label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              console.log(color);
            }}
          />
          <label htmlFor="branch">Branch:</label>
          <input
            type="text"
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
          <label htmlFor="assigned">Assigned:</label>
          <input
            type="checkbox"
            id="assigned"
            checked={assigned}
            onChange={(e) => setAssigned(e.target.checked)}
          />
          <button className="submitFormButton" type="submit">Create Employee</button>
        </form>
      )}
    </div>
  );
};

export default CreateEmployeeForm;
