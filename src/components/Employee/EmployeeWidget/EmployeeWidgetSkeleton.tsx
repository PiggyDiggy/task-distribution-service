import React from "react";
import { Employee } from "@prisma/client";

import { cx } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";

import { EmployeeTasks } from "../EmployeeTasks";

import style from "./style.module.css";

type Props = {
  employee: Employee;
};

export const EmployeeWidgetSkeleton: React.FC<Props> = ({ employee }) => {
  return (
    <li className={style.wrapper}>
      <div className={cx(style.employee, style.employee_loading)}>
        <div className={style.employee__heading}>
          <div className={cx(style.employee__thumbnail, style.employee__thumbnail_loading)} />
          <div className={style.employee__info}>
            <div className={style.employee__name}>{employee.name}</div>
            <div className={style.employee__label}>{employee.label}</div>
            <p className={style["employee__tasks-count"]}>Задач в работе: 0</p>
          </div>
        </div>
        <EmployeeTasks tasks={[]} />
      </div>
      <Spinner className={style["employee__spinner"]} />
    </li>
  );
};
