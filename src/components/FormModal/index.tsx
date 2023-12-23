import React from "react";

import { Modal } from "../Modal";
import { Button } from "../Button";

import style from "./style.module.css";

type Props = React.PropsWithChildren<{
  isOpen: boolean;
  onClose(): void;
  onSubmit(data: FormData): void;
  submitText: string;
}>;

export const FormModal: React.FC<Props> = ({ children, submitText, isOpen, onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(new FormData(e.target as HTMLFormElement));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={style.form} onSubmit={handleSubmit}>
        <Modal.Dialog className={style.modal}>{children}</Modal.Dialog>
        <Button type="submit" className={style.button}>
          {submitText}
        </Button>
      </form>
    </Modal>
  );
};