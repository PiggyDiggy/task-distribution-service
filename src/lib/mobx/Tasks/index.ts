import { makeAutoObservable } from "mobx";
import { Employee, Task } from "@prisma/client";

import { createCollection } from "@/lib/utils";
import { CreateTaskBody, createTask, patchTask, processTask } from "@/api/tasks";

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

  *createTask(task: CreateTaskBody): Generator<Promise<Task>, void, Task> {
    const newTask = yield createTask(task);
    this.addTask(newTask);
    this.rootStore.addScope(newTask.scopeName);
  }

  *assignTaskToEmployee(task: Task, employee: Employee) {
    task.executorId = employee.id;

    if (!this.employeeTasks.has(employee.id)) {
      this.employeeTasks.set(employee.id, []);
    }
    this.employeeTasks.get(employee.id)!.push(task);

    this.openTasks.delete(task.id);

    yield patchTask(task.id, { executorId: employee.id, status: "inProgress" });
  }
}
