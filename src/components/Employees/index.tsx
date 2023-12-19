"use client";

import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";
import { cx } from "@/lib/utils";

import { EmployeeWidget } from "../EmployeeWidget";
import { ScrollableList } from "../ScrollableList";
import { AddButton } from "../AddButton";

import style from "./style.module.css";

const EmployeesList: React.FC<React.PropsWithChildren> = observer(function EmployeesList({ children }) {
  const { staffStore } = useStore();

  return (
    <ScrollableList className={cx(style["employees-list"], "container")} direction="horizontal">
      {staffStore.employeesList.map((employee) => (
        <EmployeeWidget employee={employee} key={employee.id} />
      ))}
      {children}
    </ScrollableList>
  );
});

export const Employees = () => {
  return (
    <>
      <EmployeesList>
        <AddButton onClick={() => {}} />
      </EmployeesList>
    </>
  );
};
