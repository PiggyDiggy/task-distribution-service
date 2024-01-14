"use client";

import React, { useContext } from "react";
import { Employee, Scope, Task } from "@prisma/client";

import { RootStore } from ".";

const StoreContext = React.createContext<RootStore>({} as RootStore);

type ProviderProps = React.PropsWithChildren<{
  tasks: Task[];
  employees: Employee[];
  scopes: Scope[];
}>;

export const RootStoreProvider: React.FC<ProviderProps> = ({
  children,
  tasks,
  employees,
  scopes,
}) => {
  return (
    <StoreContext.Provider value={new RootStore(tasks, employees, scopes)}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
