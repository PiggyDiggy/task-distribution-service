import React from "react";
import { observer } from "mobx-react-lite";
import { Task } from "@prisma/client";

import { useStore } from "@/lib/mobx/provider";
import { pluralize } from "@/lib/utils";
import { RawData } from "@/types";

import { InputWithSelect } from "../InputWithSelect";
import { Textarea } from "../Textarea";
import { FormModal } from "../FormModal";

import style from "./style.module.css";

type Props = {
  isOpen: boolean;
  onClose(): void;
};

const valueOptions = [1, 2, 4, 8, 16].map((value) => pluralize(value, "балл", "балла", "баллов"));

export const CreateTaskModal: React.FC<Props> = observer(({ isOpen, onClose }) => {
  const { scopeNames, createTask } = useStore();

  const handleSubmit = (data: FormData) => {
    const task = Object.fromEntries(data.entries()) as RawData<Task>;
    createTask({ ...task, deadline: new Date(task.deadline), value: parseInt(task.value, 10) });
    onClose();
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitText="Добавить задачу">
      <Textarea placeholder="Заголовок задачи" name="title" required />
      <Textarea
        className={style["textarea-description"]}
        placeholder="Текстовое описание задачи"
        name="description"
        required
      />
      <InputWithSelect
        className={style["scope-select"]}
        options={scopeNames}
        label="Область деятельности"
        type="text"
        name="scopeName"
        autoComplete="off"
      />
      <div className={style.modal__row}>
        <InputWithSelect
          className={style["value-select"]}
          options={valueOptions}
          label="Значимость"
          name="value"
          readOnly
        />
        <InputWithSelect
          className={style.deadline}
          label="Срок выполнения"
          type="date"
          name="deadline"
          required
        />
      </div>
    </FormModal>
  );
});
