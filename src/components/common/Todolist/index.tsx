import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

interface Column {
  id: "title" | "description" | "date" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 120 },
  { id: "description", label: "Description", minWidth: 180 },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
    align: "right",
    format: (value: number | string) => value?.toLocaleString("en-US") ?? "-",
  },
  { id: "actions", label: "Actions", align: "center", minWidth: 80 },
];

interface TodolistProps {
  title: string;
  description: string;
  date: number;
}

export default function Todolist({ todolist }: { todolist: TodolistProps[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", margin: "80px auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {todolist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                          <EditIcon style={{marginRight: '10px'}} />
                          <DeleteIcon />
                        </TableCell>
                      );
                    }
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && column.label === "Date" ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={todolist.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
