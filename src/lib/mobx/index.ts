import { makeAutoObservable } from "mobx";
import { Employee, Scope, Task } from "@prisma/client";
import { enableStaticRendering } from "mobx-react-lite";

import { TasksStore } from "./Tasks";
import { StaffStore } from "./Staff";

enableStaticRendering(typeof window === "undefined");

export class RootStore {
  tasksStore: TasksStore;
  staffStore: StaffStore;
  scopes: Scope[];

  constructor(tasks: Task[], employees: Employee[], employeeTasks: Task[][], scopes: Scope[]) {
    const employeeTasksCollection = employeeTasks.reduce((collection, tasks, i) => {
      return collection.set(employees[i].id, tasks);
    }, new Map<string, Task[]>());
    this.tasksStore = new TasksStore(tasks, employeeTasksCollection, this);
    this.staffStore = new StaffStore(employees, this);
    this.scopes = scopes;
    makeAutoObservable(this);
  }

  get scopeNames() {
    return this.scopes.map((scope) => scope.name);
  }
}
