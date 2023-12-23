import { makeAutoObservable } from "mobx";
import { Employee, Scope, Task } from "@prisma/client";
import { enableStaticRendering } from "mobx-react-lite";

import { CreateTaskBody, createTask, patchTask } from "@/api/tasks";
import { CreateEmployeeBody, createEmployee } from "@/api/staff";

import { getScopeMap } from "../utils";

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

  *createTask(task: CreateTaskBody): Generator<Promise<Task>, void, Task> {
    const newTask = yield createTask(task);
    this.tasksStore.addTask(newTask);
    this.addScope(newTask.scopeName);
  }

  *createEmployee(employee: CreateEmployeeBody): Generator<Promise<Employee>, void, Employee> {
    const newEmployee = yield createEmployee(employee);
    this.staffStore.addEmployee(newEmployee);
    this.addScope(employee.scopeName);
  }

  distributeTasks() {
    const scopeTasks = getScopeMap(this.tasksStore.openTasksList, this.tasksStore.getTask);
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
        this.assignTaskToEmployee(tasks[i], employees[currentEmployeeIndex]);
      }
    });
  }

  *assignTaskToEmployee(task: Task, employee: Employee) {
    task.executorId = employee.id;

    if (!this.tasksStore.employeeTasks.has(employee.id)) {
      this.tasksStore.employeeTasks.set(employee.id, []);
    }
    this.tasksStore.employeeTasks.get(employee.id)!.push(task);

    this.tasksStore.openTasks.delete(task.id);

    yield patchTask(task.id, { executorId: employee.id, status: "inProgress" });
  }
}
