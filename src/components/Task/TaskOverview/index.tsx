import React from "react";
import { Task } from "@prisma/client";

import { Modal } from "@/components/ui/Modal";
import { TaskWidget } from "@/components/Task/TaskWidget";

import style from "./style.module.css";

type Props = {
  task: Task;
  isOpen: boolean;
  onClose(): void;
};

export const TaskOverview: React.FC<Props> = ({ task, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TaskWidget
        className={style.widget}
        renderDescription={() => <p className={style.widget__description}>{task.description}</p>}
        as="div"
        task={task}
      />
    </Modal>
  );
};
