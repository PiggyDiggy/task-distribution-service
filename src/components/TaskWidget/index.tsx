import React from "react";
import { Task } from "@prisma/client";

import { pluralize, formatDate } from "@/lib/utils";

import style from "./style.module.css";

type Props = {
  task: Task;
};

export const TaskWidget: React.FC<Props> = ({ task }) => {
  return (
    <li className={style["task-widget"]}>
      <p className={style["task-widget__title"]}>{task.title}</p>
      <p className={style["task-widget__description"]}>{task.description}</p>
      <div className={style["task-widget__bottom-row"]}>
        <span className={style["task-widget__value"]}>{pluralize(task.value, "балл", "балла", "баллов")}</span>
        <span className={style["task-widget__deadline"]}>{formatDate(task.deadline, "long")}</span>
      </div>
    </li>
  );
};
