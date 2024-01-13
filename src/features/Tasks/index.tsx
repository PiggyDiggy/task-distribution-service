"use client";

import dynamic from "next/dynamic";

import { useModalState } from "@/hooks/useModalState";
import { AddButton } from "@/components/ui/AddButton";

import { TasksList } from "./components/TasksList";
import { LoadingTasksList } from "./components/LoadingTasksList";
import style from "./style.module.css";

const CreateTaskModal = dynamic(
  () => import("@/components/Task/CreateTaskModal").then((module) => module.CreateTaskModal),
  {
    ssr: false,
  }
);

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
