import { makeAutoObservable } from "mobx";
import { Employee, Scope, Task } from "@prisma/client";
import { enableStaticRendering } from "mobx-react-lite";

import { getScopeMap } from "../utils";

import { TasksStore } from "./Tasks";
import { StaffStore } from "./Staff";

enableStaticRendering(typeof window === "undefined");

export class RootStore {
  tasksStore: TasksStore;
  staffStore: StaffStore;
  scopes: Scope[];

  constructor(tasks: Task[], employees: Employee[], scopes: Scope[]) {
    this.tasksStore = new TasksStore(tasks, this);
    this.staffStore = new StaffStore(employees, this);
    this.scopes = scopes;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get scopeNames() {
    return this.scopes.map((scope) => scope.name);
  }

  addScope(name: string) {
    if (!this.scopes.find((scope) => scope.name === name)) {
      this.scopes.push({ name });
    }
  }

  distributeTasks() {
    const scopeTasks = getScopeMap(this.tasksStore.undistributedTasks, this.tasksStore.getTask);
    const scopeEmployees = getScopeMap(this.staffStore.employeesList, this.staffStore.getEmployee);

    scopeTasks.forEach((tasks, scope) => {
      const employees = scopeEmployees.get(scope);
      if (!employees) return;

      const tasksCountPerEmployee = Math.floor(tasks.length / employees.length) || 1;

      let currentEmployeeIndex = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (i > 0 && i % tasksCountPerEmployee === 0 && currentEmployeeIndex < employees.length - 1) {
          currentEmployeeIndex++;
        }
        this.tasksStore.assignTaskToEmployee(tasks[i], employees[currentEmployeeIndex]);
      }
    });
  }
}
