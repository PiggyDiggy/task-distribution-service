import { makeAutoObservable } from "mobx";
import { Employee } from "@prisma/client";

import { createCollection } from "@/lib/utils";

import { RootStore } from "..";

export class StaffStore {
  employees: Map<string, Employee>;
  rootStore: RootStore;

  constructor(employees: Employee[], rootStore: RootStore) {
    this.rootStore = rootStore;
    this.employees = createCollection(employees);
    
    makeAutoObservable(this);
  }
}
