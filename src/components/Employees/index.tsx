"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";

import { useModalState } from "@/hooks/useModalState";
import { useStore } from "@/lib/mobx/provider";
import { cx } from "@/lib/utils";

import { EmployeeWidget } from "../EmployeeWidget";
import { ScrollableList } from "../ScrollableList";
import { AddButton } from "../AddButton";

import style from "./style.module.css";

const AddEmployeeModal = dynamic(() => import("../AddEmployeeModal").then((module) => module.AddEmployeeModal), {
  ssr: false,
});

const EmployeesList = observer(function EmployeesList() {
  const { staffStore } = useStore();

  return (
    <>
      {staffStore.employeesList.map((employeeId) => (
        <EmployeeWidget employee={staffStore.getEmployee(employeeId)} key={employeeId} />
      ))}
    </>
  );
});

const LoadingEmployeesList = observer(function LoadingEmployeesList() {
  const {
    staffStore: { loadingEmployees },
  } = useStore();

  return (
    <>
      {loadingEmployees.map((employee) => (
        <EmployeeWidget employee={employee} key={employee.id} loading />
      ))}
    </>
  );
});

export const Employees = () => {
  const { isOpen, open: openModal, close: closeModal } = useModalState();

  return (
    <>
      <ScrollableList className={cx(style["employees-list"], "container")} direction="horizontal">
        <EmployeesList />
        <LoadingEmployeesList />
        <AddButton onClick={openModal} />
      </ScrollableList>
      <AddEmployeeModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};
