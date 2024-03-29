import React from "react";
import { Task } from "@prisma/client";

import { pluralize, formatDate, cx } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

import style from "./style.module.css";

type Props = {
  task: Task;
  className?: string;
  as?: keyof React.ReactHTML;
  renderDescription?: () => React.ReactNode;
};

export const TaskWidgetSkeleton: React.FC<Props> = ({ task, className, as: Tag = "li", renderDescription }) => {
  return (
    <Tag className={cx(style.wrapper, className)}>
      <div className={cx(style["task-widget"], style["task-widget_loading"])}>
        <p className={style["task-widget__title"]}>{task.title}</p>
        {renderDescription?.() || <p className={style["task-widget__description"]}>{task.description}</p>}
        <div className={style["task-widget__bottom-row"]}>
          <span className={style["task-widget__value"]}>{pluralize(task.value, "балл", "балла", "баллов")}</span>
          <span className={style["task-widget__deadline"]}>{formatDate(task.deadline, "long")}</span>
        </div>
      </div>
      <Spinner className={style["task-widget__spinner"]} />
    </Tag>
  );
};
