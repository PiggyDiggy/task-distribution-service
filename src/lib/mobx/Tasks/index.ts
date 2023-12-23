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

    makeAutoObservable(this, {}, { autoBind: true });
  }

  getEmployeeTasks(employeeId: string) {
    return this.employeeTasks.get(employeeId) || [];
  }

  get openTasksList() {
    return [...this.openTasks.keys()];
  }

  getTask(taskId: number) {
    return this.openTasks.get(taskId) as NonNullable<Task>;
  }

  addTask(newTask: Task) {
    this.openTasks.set(newTask.id, processTask(newTask));
  }
}
