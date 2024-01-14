import React from "react";
import { Task } from "@prisma/client";

import { pluralize, formatDate, cx } from "@/lib/utils";

import style from "./style.module.css";
import { DeleteModal } from "@/components/DeleteModal";
import { observer } from "mobx-react-lite";
import { useStore } from "@/lib/mobx/provider";

type Props = {
  task: Task;
  className?: string;
  as?: keyof React.ReactHTML;
  renderDescription?: () => React.ReactNode;
};

export const TaskWidget: React.FC<Props> = observer(function TaskWidget({
  task,
  className,
  as: Tag = "li",
  renderDescription,
}) {
  const {
    tasksStore: { deleteTask },
  } = useStore();

  const renderDeleteModalDescription = () => (
    <>
      Вы уверены, что хотите удалить задачу <strong>{task.title}</strong>?
    </>
  );

  return (
    <Tag className={cx(style.wrapper, className)}>
      <div className={style["task-widget"]}>
        <p className={style["task-widget__title"]}>{task.title}</p>
        {renderDescription?.() || <p className={style["task-widget__description"]}>{task.description}</p>}
        <div className={style["task-widget__bottom-row"]}>
          <span className={style["task-widget__value"]}>{pluralize(task.value, "балл", "балла", "баллов")}</span>
          <span className={style["task-widget__deadline"]}>{formatDate(task.deadline, "long")}</span>
        </div>
      </div>
      <DeleteModal
        title="Удаление задачи"
        renderDescription={renderDeleteModalDescription}
        onDelete={() => deleteTask(task)}
        className={style["task-widget__delete-icon"]}
      />
    </Tag>
  );
});
