import React from "react";
import { Task } from "@prisma/client";

import { pluralize, formatDate, cx } from "@/lib/utils";

import style from "./style.module.css";

type Props = {
  task: Task;
  className?: string;
  as?: keyof React.ReactHTML;
};

export const TaskWidget: React.FC<Props> = ({ task, className, as: Tag = "li" }) => {
  return (
    <Tag className={cx(style["task-widget"], className)}>
      <p className={style["task-widget__title"]}>{task.title}</p>
      <p className={style["task-widget__description"]}>{task.description}</p>
      <div className={style["task-widget__bottom-row"]}>
        <span className={style["task-widget__value"]}>{pluralize(task.value, "балл", "балла", "баллов")}</span>
        <span className={style["task-widget__deadline"]}>{formatDate(task.deadline, "long")}</span>
      </div>
    </Tag>
  );
};
