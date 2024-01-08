"use client";

import React from "react";
import dynamic from "next/dynamic";

import { useModalState } from "@/hooks/useModalState";
import { cx } from "@/lib/utils";
import { ScrollableList } from "@/components/ui/ScrollableList";
import { AddButton } from "@/components/ui/AddButton";

import { EmployeesList } from "./components/EmployeesList";
import { LoadingEmployeesList } from "./components/LoadingEmployeesList";
import style from "./style.module.css";

const AddEmployeeModal = dynamic(
  () => import("@/components/AddEmployeeModal").then((module) => module.AddEmployeeModal),
  {
    ssr: false,
  }
);

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
