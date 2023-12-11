"use client";

import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";
import { cx } from "@/lib/utils";

import { EmployeeWidget } from "../EmployeeWidget";

import style from "./style.module.css";

export const EmployeesList = observer(function EmployeesList() {
  const { staffStore } = useStore();
  const employees = [...staffStore.employees.values()];

  return (
    <ul className={cx(style["employees-list"], "container")}>
      {employees.map((employee) => (
        <EmployeeWidget employee={employee} key={employee.id} />
      ))}
    </ul>
  );
});
