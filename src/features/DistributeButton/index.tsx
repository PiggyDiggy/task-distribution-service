"use client";

import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";
import { Button } from "@/components/ui/Button";

import style from "./style.module.css";

export const DistributeButton = observer(() => {
  const { distributeTasks, tasksStore, staffStore } = useStore();

  const existsUndistributedTask = () => {
    const scopes = new Set<string>();

    for (const taskId of tasksStore.openTasksList) {
      const task = tasksStore.getTask(taskId);
      scopes.add(task.scopeName);
    }

    for (const employeeId of staffStore.employeesList) {
      const employee = staffStore.getEmployee(employeeId);
      if (scopes.has(employee.scopeName)) {
        return true;
      }
    }
    return false;
  };

  return (
    <Button disabled={!existsUndistributedTask()} onClick={distributeTasks} className={style.button}>
      Распределить задачи
    </Button>
  );
});
