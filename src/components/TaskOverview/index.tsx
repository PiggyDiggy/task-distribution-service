import React from "react";
import { Task } from "@prisma/client";

import { Modal } from "../Modal";
import { TaskWidget } from "../TaskWidget";

import style from "./style.module.css";

type Props = {
  task: Task;
  isOpen: boolean;
  onClose(): void;
};

export const TaskOverview: React.FC<Props> = ({ task, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TaskWidget className={style.widget} as="div" task={task} />
    </Modal>
  );
};
