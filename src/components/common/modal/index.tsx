import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModalBase from "@mui/material/Modal";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";

const style = {
  position: "fixed" as "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 5,
  maxWidth: "60%",
};

export default function Modal({
  modalType,
  modalCb,
  onClose,
}: {
  modalType?: "add" | "delete";
  modalCb: (title?: string, description?: string) => void;
  onClose: () => void;
}) {
  const [todoInfo, setTodoInfo] = useState({ title: "", description: "" });
  return (
    <div>
      <ModalBase
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon
            style={{ position: "absolute", right: "16px", top: "16px", cursor: "pointer" }}
            onClick={onClose}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {modalType === "add" ? (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add a todo in todolist
                </Typography>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Title"
                  onChange={(e) => {
                    setTodoInfo((prev) => ({ ...prev, title: e.target.value }));
                  }}
                  required
                />
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Description"
                  onChange={(e) => {
                    setTodoInfo((prev) => ({ ...prev, description: e.target.value }));
                  }}
                  required
                />
                <Button
                  style={{ marginTop: "24px" }}
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={() => {
                    modalCb(todoInfo.title, todoInfo.description);
                  }}
                >
                  Send
                </Button>
              </>
            ) : (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete all todos
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    modalCb();
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </Box>
      </ModalBase>
    </div>
  );
}
