import React from "react";
import { Employee } from "@prisma/client";

import { useStore } from "@/lib/mobx/provider";
import { RawData } from "@/types";
import { Textarea } from "@/components/ui/Textarea";
import { InputWithSelect } from "@/components/ui/InputWithSelect";
import { FormModal } from "@/components/FormModal";

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const AddEmployeeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    scopeNames,
    staffStore: { createEmployee },
  } = useStore();

  const handleSubmit = (data: FormData) => {
    const employee = Object.fromEntries(data.entries()) as RawData<Employee>;
    createEmployee(employee);
    onClose();
  };

  return (
    <FormModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitText="Добавить сотрудника">
      <Textarea placeholder="Имя фамилия" name="name" required />
      <Textarea placeholder="Должность" name="label" required />
      <InputWithSelect
        options={scopeNames}
        label="Область деятельности"
        type="text"
        name="scopeName"
        autoComplete="off"
      />
    </FormModal>
  );
};
