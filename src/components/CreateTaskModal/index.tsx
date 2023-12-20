import React from "react";
import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";

import { InputWithSelect } from "../InputWithSelect";

import style from "./style.module.css";

const Modal = dynamic(() => import("../Modal").then((module) => module.Modal), { ssr: false });

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const CreateTaskModal: React.FC<Props> = observer(({ isOpen, onClose }) => {
  const { scopeNames } = useStore();

  return (
    <Modal className={style.modal} isOpen={isOpen} onClose={onClose}>
      <InputWithSelect options={scopeNames} />
    </Modal>
  );
});
