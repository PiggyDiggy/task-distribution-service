import React from "react";
import Image from "next/image";
import { Task } from "@prisma/client";

import { cx } from "@/lib/utils";
import tasksPlaceholder from "@/assets/tasks-placeholder.svg";

import { TaskSnippet } from "../TaskSnippet";
import { ScrollableList } from "../ScrollableList";

import style from "./style.module.css";

type Props = {
  tasks: Task[];
};

export const EmployeeTasks: React.FC<Props> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className={cx(style.content, style.placeholder)}>
        <Image className={style.placeholder__image} height={104} width={284} src={tasksPlaceholder} alt="no tasks" />
        <div className={style.placeholder__text}>Список задач пуст</div>
      </div>
    );
  }

  return (
    <ScrollableList className={cx(style.content, style.tasks)}>
      {tasks.map((task) => (
        <TaskSnippet key={task.id} task={task} />
      ))}
    </ScrollableList>
  );
};
