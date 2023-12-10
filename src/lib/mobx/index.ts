import { makeAutoObservable } from "mobx";
import { Employee, Task } from "@prisma/client";
import { enableStaticRendering } from "mobx-react-lite";

import { TasksStore } from "./Tasks";
import { StaffStore } from "./Staff";

enableStaticRendering(typeof window === "undefined");

export class RootStore {
  tasksStore: TasksStore;
  staffStore: StaffStore;

  constructor(tasks: Task[], employees: Employee[]) {
    this.tasksStore = new TasksStore(tasks);
    this.staffStore = new StaffStore(employees);
    makeAutoObservable(this);
  }
}