import gql from "graphql-tag";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Todolist from "../common/Todolist";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { useModal } from "../context/modals";

const GetToDosQuery = gql`
  query {
    getToDos {
      id
      description
      title
      date
    }
  }
`;

const DeleteToDosMutation = gql`
  mutation {
    deleteToDos
  }
`;

const CreateToDoMutation = gql`
  mutation ($toDoInput: ToDoInput) {
    createToDo(toDoInput: $toDoInput)
  }
`;

const Index = () => {
  const { data, refetch } = useQuery(GetToDosQuery);
  const [deleteToDo] = useMutation(DeleteToDosMutation, {
    onCompleted(data) {
      if (data.deleteToDos) refetch();
      closeModal();
    },
  });
  const [createToDo] = useMutation(CreateToDoMutation, {
    async onCompleted(data) {
      if (data.createToDo) {
        await refetch();
      }
      closeModal();
    },
  });
  const { openModal, closeModal } = useModal();

  return (
    <div>
      <nav style={{ position: "fixed", top: "24px", right: "32px" }}>
        <Add
          style={{
            width: "32px",
            height: "32px",
            marginRight: "16px",
            color: "#333",
            border: "1px solid #333",
            borderRadius: "50%",
          }}
          onClick={() => {
            openModal("add", (title, description) => {
              if (title && description)
                createToDo({ variables: { toDoInput: { title, description } } });
            });
          }}
        />
        <Delete
          style={{
            width: "32px",
            height: "32px",
            color: "#333",
            border: "1px solid #333",
            borderRadius: "50%",
          }}
          onClick={() => {
            openModal("delete", () => {
              deleteToDo();
            });
          }}
        />
      </nav>
      <div>
        <Todolist todolist={data?.getToDos ?? []} />
      </div>
    </div>
  );
};

export default Index;
