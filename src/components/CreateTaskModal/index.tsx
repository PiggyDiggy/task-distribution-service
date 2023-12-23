import React from "react";
import { observer } from "mobx-react-lite";
import { Task } from "@prisma/client";

import { useStore } from "@/lib/mobx/provider";
import { pluralize } from "@/lib/utils";
import { RawData } from "@/types";

import { InputWithSelect } from "../InputWithSelect";
import { Textarea } from "../Textarea";
import { Modal } from "../Modal";
import { Button } from "../Button";

import style from "./style.module.css";

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const CreateTaskModal: React.FC<Props> = observer(({ isOpen, onClose }) => {
  const { scopeNames, createTask } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const task = Object.fromEntries(data.entries()) as unknown as RawData<Task>;
    createTask({ ...task, deadline: new Date(task.deadline), value: parseInt(task.value, 10) });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className={style.form} onSubmit={handleSubmit}>
        <Modal.Dialog className={style.modal}>
          <Textarea placeholder="Заголовок задачи" name="title" required />
          <Textarea
            className={style["textarea-description"]}
            placeholder="Текстовое описание задачи"
            name="description"
            required
          />
          <InputWithSelect
            className={style["scope-select"]}
            inputProps={{ type: "text", name: "scopeName", autoComplete: "off" }}
            options={scopeNames}
            label="Область деятельности"
          />
          <div className={style.modal__row}>
            <InputWithSelect
              className={style["value-select"]}
              options={[1, 2, 4, 8, 16].map((value) => pluralize(value, "балл", "балла", "баллов"))}
              label="Значимость"
              inputProps={{ name: "value", readOnly: true }}
            />
            <InputWithSelect
              className={style.deadline}
              inputProps={{ type: "date", name: "deadline", required: true }}
              label="Срок выполнения"
            />
          </div>
        </Modal.Dialog>
        <Button type="submit" className={style.button}>
          Добавить задачу
        </Button>
      </form>
    </Modal>
  );
});
