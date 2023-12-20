"use client";

import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";
import { useModalState } from "@/hooks/useModalState";

import { TaskWidget } from "../TaskWidget";
import { AddButton } from "../AddButton";
import { CreateTaskModal } from "../CreateTaskModal";

import style from "./style.module.css";

const TasksList: React.FC<React.PropsWithChildren> = observer(function TasksList({ children }) {
  const { tasksStore } = useStore();

  return (
    <ul className={style["tasks-list"]}>
      {tasksStore.openTasksList.map((task) => (
        <TaskWidget key={task.id} task={task} />
      ))}
      {children}
    </ul>
  );
});

export const Tasks = () => {
  const { isOpen, open: openModal, close: closeModal } = useModalState();

  return (
    <>
      <TasksList>
        <AddButton onClick={openModal} />
      </TasksList>
      <CreateTaskModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
