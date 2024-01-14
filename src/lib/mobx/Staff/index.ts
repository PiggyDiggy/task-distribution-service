import { makeAutoObservable } from "mobx";
import { Employee } from "@prisma/client";

import { createCollection } from "@/lib/utils";
import { CreateEmployeeBody, methodCreateEmployee, methodDeleteEmployee } from "@/api/staff";

import { RootStore } from "..";

const getOptimisticEmployee = (employee: CreateEmployeeBody) => ({ ...employee, id: crypto.randomUUID(), photo: "" });

export class StaffStore {
  employees: Map<string, Employee>;
  loadingEmployees: Employee[] = [];
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

  private addEmployee(newEmployee: Employee) {
    this.employees.set(newEmployee.id, newEmployee);
  }

  private deleteLoadingEmployee(employeeId: string) {
    this.loadingEmployees = this.loadingEmployees.filter((employee) => employee.id !== employeeId);
  }

  *createEmployee(employee: CreateEmployeeBody): Generator<Promise<Employee>, void, Employee> {
    const optimisticEmployee = getOptimisticEmployee(employee);
    this.loadingEmployees.push(optimisticEmployee);

    try {
      const newEmployee = yield methodCreateEmployee(employee);
      this.addEmployee(newEmployee);
      this.rootStore.addScope(employee.scopeName);
    } finally {
      this.deleteLoadingEmployee(optimisticEmployee.id);
    }
  }

  *deleteEmployee(employeeId: string): Generator<Promise<null>, void, null> {
    const employee = this.employees.get(employeeId);

    try {
      this.employees.delete(employeeId);
      yield methodDeleteEmployee(employeeId);
      this.rootStore.tasksStore.unassignTasks(employeeId);
    } catch {
      if (employee) {
        this.employees.set(employeeId, employee);
      }
    }
  }
}
