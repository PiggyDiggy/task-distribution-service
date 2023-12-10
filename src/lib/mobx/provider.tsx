"use client";

import React, { useContext } from "react";
import { Employee, Task } from "@prisma/client";

import { RootStore } from ".";

const StoreContext = React.createContext<RootStore>({} as RootStore);

type ProviderProps = React.PropsWithChildren<{ tasks: Task[]; employees: Employee[] }>;

export const RootStoreProvider: React.FC<ProviderProps> = ({ children, tasks, employees }) => {
  return <StoreContext.Provider value={new RootStore(tasks, employees)}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
