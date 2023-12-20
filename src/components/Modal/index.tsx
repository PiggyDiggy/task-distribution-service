import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { cx } from "@/lib/utils";

import style from "./style.module.css";

type Props = React.PropsWithChildren<{
  isOpen: boolean;
  onClose(): void;
  className?: string;
}>;

export const Modal: React.FC<Props> = ({ children, isOpen, onClose, className }) => {
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
            <div className={cx(style.dialog, className)}>{children}</div>
          </div>
        </CSSTransition>,
        document.querySelector("#modal") as HTMLElement
      )}
    </>
  );
};
