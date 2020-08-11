import * as React from "react";
import ReactDOM from "react-dom";

export interface ModalProps {
  children: React.ReactNode;
}

export interface ModalContainerProps {
  children: React.ReactNode;
}
const appRoot = document.getElementById("root");

const ModalContainer: React.SFC<ModalProps> = ({ children }) => {
  return (
    <div
      className='absolute transform -translate-x-1/2 -translate-y-1/2'
      style={{ top: "50%", left: "50%" }}
    >
      {children}
    </div>
  );
};

const Modal: React.SFC<ModalProps> = ({ children }) => {
  return (
    appRoot &&
    ReactDOM.createPortal(<ModalContainer>{children}</ModalContainer>, appRoot)
  );
};

export default Modal;
