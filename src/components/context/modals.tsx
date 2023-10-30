import React, { createContext, useContext, useState } from "react";
import Modal from "../common/modal";

const ModalContext = createContext<{
  modalcb?: () => void;
  openModal?: (type?: "add" | "delete", cb?: (title?: string, desc?: string) => void) => void;
  closeModal?: () => void;
}>({});

export function useModal() {
  return useContext(ModalContext);
}

export default function ModalsProvider({ children }) {
  const [modalStatus, setModalStatus] = useState({ isShow: false, cb: undefined, type: undefined });

  const openModal = (type, cb) => {
    setModalStatus({ isShow: true, cb, type });
  };

  const closeModal = () => {
    setModalStatus({ isShow: false, cb: undefined, type: undefined });
  };
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalStatus.isShow && (
        <Modal modalType={modalStatus.type} modalCb={modalStatus.cb} onClose={closeModal} />
      )}
    </ModalContext.Provider>
  );
}
