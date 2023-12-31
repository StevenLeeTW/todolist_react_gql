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
import { useModal } from "../../context/modals";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const ONE_DAY_TIMESTAMP = 86400000;

interface Column {
  id: "title" | "description" | "date" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  dateFormat?: (value: number | string) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 120 },
  { id: "description", label: "Description", minWidth: 180 },
  {
    id: "date",
    label: "CreatedAt",
    minWidth: 120,
    align: "right",
    dateFormat: (value: number | string) => new Date(value).toLocaleString() ?? "-",
  },
  { id: "actions", label: "Actions", align: "center", minWidth: 80 },
];

interface TodolistProps {
  id: string;
  title: string;
  description: string;
  date: string;
}

const DeleteToDoMutation = gql`
  mutation ($toDoId: ID!) {
    deleteToDo(toDoId: $toDoId)
  }
`;

const UpdateToDoMutation = gql`
  mutation ($toDoId: ID!, $toDoInput: ToDoInput) {
    updateToDo(toDoId: $toDoId, toDoInput: $toDoInput) {
      date
      description
      id
      title
    }
  }
`;

export default function Todolist({
  todolist,
  refetch,
}: {
  todolist: TodolistProps[];
  refetch: () => void;
}) {
  const { openModal, closeModal } = useModal();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteToDo] = useMutation(DeleteToDoMutation, {
    onCompleted(data) {
      if (data.deleteToDo) refetch();
      closeModal();
    },
  });
  const [updateToDo] = useMutation(UpdateToDoMutation, {
    async onCompleted(data) {
      if (data.updateToDo) {
        await refetch();
      }
      closeModal();
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", margin: "30px auto" }}>
      <TableContainer sx={{ maxHeight: "80vh" }}>
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
              const cur = new Date().getTime();
              const rowDate = new Date(row.date).getTime();
              const diff = cur - rowDate;
              let bgColor = "white";
              if (diff > 1200000) {
                bgColor = "#6fbf73";
              } else if (diff > ONE_DAY_TIMESTAMP) {
                bgColor = "#4dabf5";
              } else if (diff > 3 * ONE_DAY_TIMESTAMP) {
                bgColor = "#ffcd38";
              } else if (diff > 5 * ONE_DAY_TIMESTAMP) {
                bgColor = "#f44336";
              } else if (diff > 7 * ONE_DAY_TIMESTAMP) {
                bgColor = "#673ab7";
              }
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <EditIcon
                            style={{
                              marginRight: "10px",
                              color: "#555",
                              border: `1px solid #555`,
                              cursor: "pointer",
                              backgroundColor: bgColor,
                              borderRadius: "50%",
                            }}
                            onClick={() => {
                              openModal("edit", (title, description) => {
                                updateToDo({
                                  variables: {
                                    toDoId: row.id,
                                    toDoInput: { title, description },
                                  },
                                });
                              });
                            }}
                          />
                          <DeleteIcon
                            style={{
                              borderWidth: "2px",
                              cursor: "pointer",
                              color: "#555",
                              border: `1px solid #555`,
                              backgroundColor: bgColor,
                              borderRadius: "50%",
                            }}
                            onClick={() => {
                              openModal("deleteOne", () => {
                                deleteToDo({ variables: { toDoId: row.id } });
                              });
                            }}
                          />
                        </TableCell>
                      );
                    }
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.dateFormat && column.label === "Date"
                          ? column.dateFormat(value)
                          : value}
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
