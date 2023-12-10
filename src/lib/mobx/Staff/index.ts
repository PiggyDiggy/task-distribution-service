import { makeAutoObservable } from "mobx";
import { Employee } from "@prisma/client";

export class StaffStore {
  employees: Employee[];

  constructor(employees: Employee[]) {
    this.employees = employees;
    makeAutoObservable(this);
  }
}
