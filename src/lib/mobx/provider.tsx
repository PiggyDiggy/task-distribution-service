"use client";

import React, { useContext } from "react";
import { Employee, Task } from "@prisma/client";

import { RootStore } from ".";

const StoreContext = React.createContext<RootStore>({} as RootStore);

type ProviderProps = React.PropsWithChildren<{
  openTasks: Task[];
  employees: Employee[];
  employeeTasks: Task[][];
}>;

export const RootStoreProvider: React.FC<ProviderProps> = ({ children, openTasks, employees, employeeTasks }) => {
  return (
    <StoreContext.Provider value={new RootStore(openTasks, employees, employeeTasks)}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
