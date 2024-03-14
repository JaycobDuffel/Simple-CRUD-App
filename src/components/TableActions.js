import React from "react"


export default function TableActions({ row, setSelectedEmployee }) {
  const handleSelect = (row) => {
    setSelectedEmployee(row.original);
  };
  
  const handleDelete = (row) => {
    // Implement logic to delete the selected employee (e.g., confirmation prompt and API call)
    console.log("Delete employee:", row);
  };

  return (
    <div className='actions'>
      <button onClick={() => handleSelect(row.original)}>Select</button>
      <button onClick={() => handleDelete(row.original)}>Delete</button>
    </div>
  )
}