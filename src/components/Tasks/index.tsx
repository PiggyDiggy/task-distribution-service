"use client";

import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";

import { useStore } from "@/lib/mobx/provider";
import { useModalState } from "@/hooks/useModalState";

import { TaskWidget } from "../TaskWidget";
import { AddButton } from "../AddButton";

import style from "./style.module.css";

const CreateTaskModal = dynamic(() => import("../CreateTaskModal").then((module) => module.CreateTaskModal), {
  ssr: false,
});

const TasksList = observer(function TasksList() {
  const { tasksStore } = useStore();

  return (
    <>
      {tasksStore.openTasksList.map((taskId) => (
        <TaskWidget key={taskId} task={tasksStore.getTask(taskId)} />
      ))}
    </>
  );
});

const LoadingTasksList = observer(function LoadingTasksList() {
  const {
    tasksStore: { loadingTasks },
  } = useStore();

  return (
    <>
      {loadingTasks.map((task) => (
        <TaskWidget key={task.id} task={task} loading />
      ))}
    </>
  );
});

export const Tasks = () => {
  const { isOpen, open: openModal, close: closeModal } = useModalState();

  return (
    <>
      <ul className={style["tasks-list"]}>
        <TasksList />
        <LoadingTasksList />
        <AddButton onClick={openModal} />
      </ul>
      <CreateTaskModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
