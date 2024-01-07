import { makeAutoObservable } from "mobx";
import { Employee, Task } from "@prisma/client";

import { createCollection } from "@/lib/utils";
import { CreateTaskBody, methodCreateTask, methodPatchTask } from "@/api/tasks";

import { RootStore } from "..";

const getOptimisticTask = (task: CreateTaskBody) => ({
  ...task,
  id: Date.now(),
  createdAt: new Date(),
  status: "open" as const,
  executorId: null,
});

export class TasksStore {
  openTasks: Map<number, Task>;
  employeeTasks: Map<string, Task[]>;
  loadingTasks: Task[] = [];
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

  private addTask(newTask: Task) {
    this.openTasks.set(newTask.id, newTask);
  }

  private deleteLoadingTask(taskId: number) {
    this.loadingTasks = this.loadingTasks.filter(task => task.id !== taskId);
  }

  *createTask(task: CreateTaskBody): Generator<Promise<Task>, void, Task> {
    const optimisticTask = getOptimisticTask(task);
    this.loadingTasks.push(optimisticTask);

    try {
      const newTask = yield methodCreateTask(task);
      this.addTask(newTask);
      this.rootStore.addScope(newTask.scopeName);
    } finally {
      this.deleteLoadingTask(optimisticTask.id);
    }
  }

  *assignTaskToEmployee(task: Task, employee: Employee) {
    task.executorId = employee.id;

    if (!this.employeeTasks.has(employee.id)) {
      this.employeeTasks.set(employee.id, []);
    }
    this.employeeTasks.get(employee.id)!.push(task);

    this.openTasks.delete(task.id);

    yield methodPatchTask(task.id, { executorId: employee.id, status: "inProgress" });
  }
}
