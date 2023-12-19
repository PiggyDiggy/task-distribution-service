"use client";

import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";

import { TaskWidget } from "../TaskWidget";
import { AddButton } from "../AddButton";

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
  return (
    <>
      <TasksList>
        <AddButton onClick={() => {}} />
      </TasksList>
    </>
  );
};
