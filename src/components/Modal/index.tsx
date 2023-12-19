import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import style from "./style.module.css";

type Props = React.PropsWithChildren<{
  isOpen: boolean;
  onClose(): void;
}>;

export const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {createPortal(
        <CSSTransition
          in={isOpen}
          nodeRef={modalRef}
          timeout={200}
          classNames={{
            enter: style.modal_enter,
            enterActive: style["modal_enter-active"],
            exit: style.modal_exit,
            exitActive: style["modal_exit-active"],
          }}
          mountOnEnter
          unmountOnExit
        >
          <div ref={modalRef} className={style.modal}>
            <div className={style.backdrop} onClick={onClose}></div>
            <div className={style.dialog}>{children}</div>
          </div>
        </CSSTransition>,
        document.querySelector("#modal") as HTMLElement
      )}
    </>
  );
};
