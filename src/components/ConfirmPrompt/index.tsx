import React from "react";

import { Modal } from "../ui/Modal";

import style from "./style.module.css";

type Props = {
  title: string;
  renderDescription?: () => React.ReactNode;
  renderAcceptButton: () => React.ReactNode;
  renderDeclineButton: () => React.ReactNode;
  isOpen: boolean;
  close(): void;
};

export const ConfirmPrompt: React.FC<Props> = ({
  title,
  renderDescription,
  renderAcceptButton,
  renderDeclineButton,
  isOpen,
  close,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Dialog className={style.wrapper}>
        <p className={style.title}>{title}</p>
        {renderDescription && <p className={style.description}>{renderDescription()}</p>}
        <div className={style.buttons}>
          {renderDeclineButton()}
          {renderAcceptButton()}
        </div>
      </Modal.Dialog>
    </Modal>
  );
};
