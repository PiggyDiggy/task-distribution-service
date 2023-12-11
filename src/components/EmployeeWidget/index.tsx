import React from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { Employee } from "@prisma/client";

import { useStore } from "@/lib/mobx/provider";

import style from "./style.module.css";
import { EmployeeTasks } from "../EmployeeTasks";

type Props = {
  employee: Employee;
};

export const EmployeeWidget: React.FC<Props> = observer(function EmployeeWidget({ employee }) {
  const { tasksStore } = useStore();
  const employeeTasks = tasksStore.getEmployeeTasks(employee.id);

  return (
    <li className={style.employee}>
      <div className={style.employee__heading}>
        <Image className={style.employee__thumbnail} width={100} height={100} src={employee.photo} alt="person photo" />
        <div className={style.employee__info}>
          <div className={style.employee__name}>{employee.name}</div>
          <div className={style.employee__label}>{employee.label}</div>
          <p className={style["employee__tasks-count"]}>Задач в работе: {employeeTasks.length}</p>
        </div>
      </div>
      <EmployeeTasks tasks={employeeTasks} />
    </li>
  );
});
