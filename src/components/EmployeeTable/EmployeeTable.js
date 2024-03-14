import React, { useEffect } from "react";
import axios from "axios";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

import TableActions from "./TableActions";
import "./EmployeeTable.css";

const columnHelper = createColumnHelper();

const EmployeeTable = ({
  employees,
  setEmployees,
  setSelectedEmployee,
  setUpdateEmployeeMenuBGColor,
}) => {
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [setEmployees]);

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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <TableActions
          row={row}
          setSelectedEmployee={setSelectedEmployee}
          setUpdateEmployeeMenuBGColor={setUpdateEmployeeMenuBGColor}
        />
      ),
    }),
  ];

  const tableInstance = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="employeeTable">
      <thead>
        {tableInstance.getHeaderGroups().map((headerGroup) => {
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
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody>
        {tableInstance.getRowModel().rows.map((row) => {
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
  );
};

export default EmployeeTable;
