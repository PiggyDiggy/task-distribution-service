"use client";

import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";
import { TaskWidget } from "../TaskWidget";

import style from "./style.module.css";

export const TasksList = observer(function TasksList() {
  const { tasksStore } = useStore();

  return (
    <ul className={style["tasks-list"]}>
      {tasksStore.tasks.map((task) => (
        <TaskWidget key={task.id} task={task} />
      ))}
    </ul>
  );
});
