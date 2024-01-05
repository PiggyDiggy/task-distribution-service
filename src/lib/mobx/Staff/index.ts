import { makeAutoObservable } from "mobx";
import { Employee } from "@prisma/client";

import { createCollection } from "@/lib/utils";
import { CreateEmployeeBody, createEmployee } from "@/api/staff";

import { RootStore } from "..";

export class StaffStore {
  employees: Map<string, Employee>;
  rootStore: RootStore;

  constructor(employees: Employee[], rootStore: RootStore) {
    this.rootStore = rootStore;
    this.employees = createCollection(employees);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get employeesList() {
    return [...this.employees.keys()];
  }

  getEmployee(employeeId: string) {
    return this.employees.get(employeeId) as NonNullable<Employee>;
  }

  addEmployee(newEmployee: Employee) {
    this.employees.set(newEmployee.id, newEmployee);
  }

  *createEmployee(employee: CreateEmployeeBody): Generator<Promise<Employee>, void, Employee> {
    const newEmployee = yield createEmployee(employee);
    this.addEmployee(newEmployee);
    this.rootStore.addScope(employee.scopeName);
  }
}
