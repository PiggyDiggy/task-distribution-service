"use client";

import React, { useContext } from "react";
import { Employee, Scope, Task } from "@prisma/client";

import { RootStore } from ".";

const StoreContext = React.createContext<RootStore>({} as RootStore);

type ProviderProps = React.PropsWithChildren<{
  openTasks: Task[];
  employees: Employee[];
  employeeTasks: Task[][];
  scopes: Scope[];
}>;

export const RootStoreProvider: React.FC<ProviderProps> = ({
  children,
  openTasks,
  employees,
  employeeTasks,
  scopes,
}) => {
  return (
    <StoreContext.Provider value={new RootStore(openTasks, employees, employeeTasks, scopes)}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
