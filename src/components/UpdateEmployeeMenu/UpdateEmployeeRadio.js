import React from "react";

const UpdateEmployeeRadio = ({ selectedEmployee, setSelectedEmployee }) => {
  return (
    <div className="radio-group">
      <label>
        <input
          type="radio"
          id="assigned-true"
          name="assigned"
          value={true}
          checked={selectedEmployee.assigned === true}
          onChange={() =>
            setSelectedEmployee({
              ...selectedEmployee,
              assigned: true,
            })
          }
        />
        True
      </label>
      <label>
        <input
          type="radio"
          id="assigned-false"
          name="assigned"
          value={false}
          checked={selectedEmployee.assigned === false}
          onChange={() =>
            setSelectedEmployee({
              ...selectedEmployee,
              assigned: false,
            })
          }
        />
        False
      </label>
    </div>
  );
};

export default UpdateEmployeeRadio;
