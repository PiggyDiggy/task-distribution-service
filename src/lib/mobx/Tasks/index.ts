import { makeAutoObservable } from "mobx";
import { Task } from "@prisma/client";

export class TasksStore {
  tasks: Task[];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
    makeAutoObservable(this);
  }
}
