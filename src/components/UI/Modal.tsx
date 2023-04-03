import { PropsWithChildren } from 'react';
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

interface IPropsWithCloseCart {onCloseCart: () => void}

const Backdrop: React.FC<PropsWithChildren<IPropsWithCloseCart>> = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}></div>;
};

const ModalOverlay: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays")!;

const Modal: React.FC<PropsWithChildren<IPropsWithCloseCart>> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseCart={props.onCloseCart} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
