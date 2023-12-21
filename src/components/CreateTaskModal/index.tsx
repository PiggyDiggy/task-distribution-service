import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";
import { pluralize } from "@/lib/utils";

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
  const { scopeNames } = useStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Dialog className={style.modal}>
        <Textarea placeholder="Заголовок задачи" name="title" />
        <Textarea
          className={style["textarea-description"]}
          placeholder="Текстовое описание задачи"
          name="description"
        />
        <InputWithSelect
          className={style["scope-select"]}
          inputProps={{ type: "text", name: "scope" }}
          options={scopeNames}
          label="Область деятельности"
        />
        <div className={style.modal__row}>
          <InputWithSelect
            className={style["value-select"]}
            editable={false}
            options={[1, 2, 4, 8, 16].map((value) => pluralize(value, "балл", "балла", "баллов"))}
            label="Значимость"
          />
          <InputWithSelect
            className={style.deadline}
            options={[]}
            inputProps={{ type: "date", name: "deadline" }}
            label="Срок выполнения"
          />
        </div>
      </Modal.Dialog>
      <Button className={style.button}>Добавить задачу</Button>
    </Modal>
  );
});
