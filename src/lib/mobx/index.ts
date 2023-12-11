import { makeAutoObservable } from "mobx";
import { Employee, Task } from "@prisma/client";
import { enableStaticRendering } from "mobx-react-lite";

import { TasksStore } from "./Tasks";
import { StaffStore } from "./Staff";

enableStaticRendering(typeof window === "undefined");

export class RootStore {
  tasksStore: TasksStore;
  staffStore: StaffStore;

  constructor(tasks: Task[], employees: Employee[], employeeTasks: Task[][]) {
    const employeeTasksCollection = employeeTasks.reduce((collection, tasks, i) => {
      return collection.set(employees[i].id, tasks);
    }, new Map<string, Task[]>());
    this.tasksStore = new TasksStore(tasks, employeeTasksCollection, this);
    this.staffStore = new StaffStore(employees, this);
    makeAutoObservable(this);
  }
}
