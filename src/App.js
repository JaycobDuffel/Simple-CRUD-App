import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

import './App.css';
import TableActions from './components/TableActions';

const columnHelper = createColumnHelper();

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("profession", {
      header: "Profession",
    }),
    columnHelper.accessor("city", {
      header: "City",
    }),
    columnHelper.accessor("branch", {
      header: "Branch",
    }),
    columnHelper.display({
      id: 'actions',
      header: "Actions",
      cell: ({ row }) => (
        <TableActions row={row} setSelectedEmployee={setSelectedEmployee} />
      ),
    })
  ];

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="App">
      <h1>Plexxis Employees</h1>
      <div className='main'>
        <div className='tableContainer'>
          <table className='employeeTable'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th id={header.id}>
                          {" "}
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='selectedEmployee' style={{ backgroundColor: selectedEmployee?.color ? selectedEmployee.color : 'fff' }}>
          {selectedEmployee ? (
            <div style={{ width: '100%' }}>
              <h2>Employee Details</h2>
              {Object.keys(selectedEmployee).map((key) => (
                <p key={key}>
                  {`${key.charAt(0).toUpperCase()}${key.slice(1)}: `}: {selectedEmployee[key]}
                </p>
              ))}
            </div>
          ) : (
            <h1>Please select an employee from the table.</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;