"use client";

import React, { useContext } from "react";

import { SelectInputStore } from ".";

const StoreContext = React.createContext<SelectInputStore>({} as SelectInputStore);

type ProviderProps = React.PropsWithChildren<{
  options: string[];
  editable: boolean;
}>;

export const SelectInputStoreContext: React.FC<ProviderProps> = ({ children, options, editable }) => {
  return <StoreContext.Provider value={new SelectInputStore(options, editable)}>{children}</StoreContext.Provider>;
};

export const useSelectInputStore = () => useContext(StoreContext);
