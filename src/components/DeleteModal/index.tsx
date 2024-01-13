import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { cx } from "@/lib/utils";
import { useModalState } from "@/hooks/useModalState";
import { Button } from "@/components/ui/Button";
import crossIcon from "@/assets/cross.svg";

import style from "./style.module.css";

const ConfirmPrompt = dynamic(() => import("@/components/ConfirmPrompt").then((module) => module.ConfirmPrompt), {
  ssr: false,
});

type Props = {
  title: string;
  renderDescription: () => React.ReactNode;
  onDelete(): void;
  className?: string;
};

export const DeleteModal: React.FC<Props> = ({ title, renderDescription, onDelete, className }) => {
  const { isOpen, close: closeModal, open: openModal } = useModalState();

  const handleConfirm = () => {
    onDelete();
    closeModal();
  };

  return (
    <>
      <Image
        className={cx(style["delete-icon"], className)}
        onClick={openModal}
        src={crossIcon}
        height={32}
        width={32}
        alt="cross"
      />
      <ConfirmPrompt
        isOpen={isOpen}
        close={closeModal}
        title={title}
        renderDescription={renderDescription}
        renderAcceptButton={() => (
          <Button onClick={handleConfirm} className={style["modal__accept-button"]}>
            Удалить
          </Button>
        )}
        renderDeclineButton={() => (
          <Button styleType="inverted" onClick={closeModal}>
            Отмена
          </Button>
        )}
      />
    </>
  );
};
