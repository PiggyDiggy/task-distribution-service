import { makeAutoObservable } from "mobx";
import { Employee, Task } from "@prisma/client";

import { createCollection } from "@/lib/utils";
import { CreateTaskBody, methodCreateTask, methodDeleteTask, methodPatchTask } from "@/api/tasks";

import { RootStore } from "..";

const getOptimisticTask = (task: CreateTaskBody) => ({
  ...task,
  id: Date.now(),
  createdAt: new Date(),
  status: "open" as const,
  executorId: null,
});

const getEmployeeTasksMap = (tasks: Task[]) => {
  const map = new Map<string, number[]>();

  for (const { id, executorId } of tasks) {
    if (executorId) {
      if (!map.has(executorId)) {
        map.set(executorId, []);
      }
      map.get(executorId)!.push(id);
    }
  }

  return map;
};

export class TasksStore {
  tasks: Map<number, Task>;
  employeeTasks: Map<string, number[]>;
  loadingTasks: Task[] = [];
  rootStore: RootStore;

  constructor(tasks: Task[], rootStore: RootStore) {
    this.rootStore = rootStore;
    this.tasks = createCollection(tasks);
    this.employeeTasks = getEmployeeTasksMap(tasks);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  getEmployeeTasks(employeeId: string) {
    return this.employeeTasks.get(employeeId) || [];
  }

  get undistributedTasks() {
    const tasks: number[] = [];

    for (const [taskId, task] of this.tasks) {
      if (!task.executorId) {
        tasks.push(taskId);
      }
    }

    return tasks;
  }

  getTask(taskId: number) {
    return this.tasks.get(taskId) as NonNullable<Task>;
  }

  unassignTasks(employeeId: string) {
    this.getEmployeeTasks(employeeId).forEach((taskId) => (this.getTask(taskId).executorId = null));
  }

  private _deleteTask(task: Task) {
    if (task.executorId) {
      const filteredTasksList = this.employeeTasks.get(task.executorId)!.filter((taskId) => task.id !== taskId);
      this.employeeTasks.set(task.executorId, filteredTasksList);
    }
    this.tasks.delete(task.id);
  }

  private addTask(newTask: Task) {
    if (newTask.executorId) {
      this._assignTaskToEmployee(newTask.id, newTask.executorId);
    }
    this.tasks.set(newTask.id, newTask);
  }

  private deleteLoadingTask(taskId: number) {
    this.loadingTasks = this.loadingTasks.filter((task) => task.id !== taskId);
  }

  private _assignTaskToEmployee(taskId: number, employeeId: string) {
    if (!this.employeeTasks.has(employeeId)) {
      this.employeeTasks.set(employeeId, []);
    }
    this.employeeTasks.get(employeeId)!.push(taskId);
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

    this._assignTaskToEmployee(task.id, employee.id);

    yield methodPatchTask(task.id, { executorId: employee.id, status: "inProgress" });
  }

  *deleteTask(task: Task): Generator<Promise<null>, void, null> {
    try {
      this._deleteTask(task);
      yield methodDeleteTask(task.id);
    } catch {
      this.addTask(task);
    }
  }
}
