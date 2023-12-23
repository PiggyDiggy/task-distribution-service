import { makeAutoObservable } from "mobx";
import { Task } from "@prisma/client";

import { createCollection } from "@/lib/utils";
import { processTask } from "@/api/tasks";

import { RootStore } from "..";

export class TasksStore {
  openTasks: Map<number, Task>;
  employeeTasks: Map<string, Task[]>;
  rootStore: RootStore;

  constructor(openTasks: Task[], employeeTasks: Map<string, Task[]>, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.openTasks = createCollection(openTasks);
    this.employeeTasks = employeeTasks;
    makeAutoObservable(this);
  }

  getEmployeeTasks(employeeId: string) {
    return this.employeeTasks.get(employeeId) || [];
  }

  get openTasksList() {
    return [...this.openTasks.values()];
  }

  addTask(newTask: Task) {
    this.openTasks.set(newTask.id, processTask(newTask));
  }
}
