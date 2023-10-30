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
  const [deleteToDos] = useMutation(DeleteToDosMutation, {
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
      <nav
        style={{
          position: "fixed",
          top: "24px",
          right: "32px",
          zIndex: 5,
          backgroundColor: "transparent",
        }}
      >
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
              deleteToDos();
            });
          }}
        />
      </nav>
      <div style={{ display: "flex", marginLeft: "5%", marginTop: "24px" }}>
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #555",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            marginRight: "8px",
          }}
        ></div>
        <div
          style={{
            marginRight: "8px",
          }}
        >
          new
        </div>
        <div
          style={{
            backgroundColor: "#6fbf73",
            borderRadius: "50%",
            border: "1px solid #555",
            width: "16px",
            height: "16px",
            marginRight: "8px",
          }}
        />
        <div
          style={{
            marginRight: "8px",
          }}
        >
          today
        </div>
        <div
          style={{
            backgroundColor: "#4dabf5",
            borderRadius: "50%",
            border: "1px solid #555",
            width: "16px",
            height: "16px",
            marginRight: "8px",
          }}
        />
        <div
          style={{
            marginRight: "8px",
          }}
        >
          yesterday
        </div>
      </div>
      <div style={{ display: "flex", marginLeft: "5%", marginTop: "24px" }}>
        <div
          style={{
            backgroundColor: "#ffcd38",
            borderRadius: "50%",
            border: "1px solid #555",
            width: "16px",
            height: "16px",
            marginRight: "8px",
          }}
        />
        <div
          style={{
            marginRight: "8px",
          }}
        >
          3 days ago
        </div>
        <div
          style={{
            backgroundColor: "#f44336",
            borderRadius: "50%",
            border: "1px solid #555",
            width: "16px",
            height: "16px",
            marginRight: "8px",
          }}
        />
        <div
          style={{
            marginRight: "8px",
          }}
        >
          5 days ago
        </div>
      </div>
      <div style={{ display: "flex", marginLeft: "5%", marginTop: "24px" }}>
        <div
          style={{
            backgroundColor: "#673ab7",
            borderRadius: "50%",
            border: "1px solid #555",
            width: "16px",
            height: "16px",
            marginRight: "8px",
          }}
        />
        <div
          style={{
            marginRight: "8px",
          }}
        >
          long time
        </div>
      </div>
      <div>
        <Todolist todolist={data?.getToDos ?? []} refetch={refetch} />
      </div>
    </div>
  );
};


export default Index;
