import React from "react";

export default function TableActions({
  row,
  setSelectedEmployee,
  setUpdateEmployeeMenuBGColor,
}) {
  const handleSelect = (row) => {
    setSelectedEmployee(row);
    setUpdateEmployeeMenuBGColor(row.color);
  };

  return (
    <div className="actions">
      <button onClick={() => handleSelect(row.original)}>Select</button>
    </div>
  );
}
