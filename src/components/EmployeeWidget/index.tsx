import React from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { Employee } from "@prisma/client";

import { useStore } from "@/lib/mobx/provider";
import { cx } from "@/lib/utils";

import { Spinner } from "../Spinner";
import { EmployeeTasks } from "../EmployeeTasks";

import style from "./style.module.css";

type Props = {
  employee: Employee;
  loading?: boolean;
};

export const EmployeeWidget: React.FC<Props> = observer(function EmployeeWidget({ employee, loading = false }) {
  const { tasksStore } = useStore();
  const employeeTasks = tasksStore.getEmployeeTasks(employee.id);

  return (
    <li className={style.wrapper}>
      <div className={cx(style.employee, { [style.employee_loading]: loading })}>
        <div className={style.employee__heading}>
          <Image
            className={style.employee__thumbnail}
            width={100}
            height={100}
            src={employee.photo}
            alt="person photo"
          />
          <div className={style.employee__info}>
            <div className={style.employee__name}>{employee.name}</div>
            <div className={style.employee__label}>{employee.label}</div>
            <p className={style["employee__tasks-count"]}>Задач в работе: {employeeTasks.length}</p>
          </div>
        </div>
        <EmployeeTasks tasks={employeeTasks} />
      </div>
      {loading && <Spinner className={style["employee__spinner"]} />}
    </li>
  );
});
