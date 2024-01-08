import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { cx } from "@/lib/utils";

import { Button } from "../Button";

import style from "./style.module.css";

type ChildrenWithClassNameProps = React.PropsWithChildren<{ className?: string }>;

type Props = ChildrenWithClassNameProps & {
  isOpen: boolean;
  onClose(): void;
};

type Component = React.FC<Props> & {
  Dialog: React.FC<DialogProps>;
  Button: React.FC<ButtonProps>;
};

export const Modal: Component = ({ children, isOpen, onClose, className }) => {
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
          <div ref={modalRef} className={cx(style.modal, className)}>
            <div className={style.backdrop} onClick={onClose}></div>
            {children}
          </div>
        </CSSTransition>,
        document.querySelector("#modal") as HTMLElement
      )}
    </>
  );
};

type DialogProps = ChildrenWithClassNameProps;

Modal.Dialog = function ModalDialog({ children, className }) {
  return <div className={cx(style.dialog, className)}>{children}</div>;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

Modal.Button = function ModalButton({ children, className }) {
  return <Button className={cx(style.button, className)}>{children}</Button>;
};
