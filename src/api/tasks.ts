import { Task } from "@prisma/client";
import { method, getURL } from ".";

export function getTasks(params?: Record<string, any>) {
  return method<Task[]>({
    path: getURL("tasks"),
    params,
    fetchOptions: {
      next: { tags: ["tasks"] },
    },
  });
}

export function createTask(task: Omit<Task, "id" | "status" | "executorId">) {
  return method<Task>({
    path: getURL("tasks"),
    method: "POST",
    body: task,
  });
}

export function deleteTask(id: number) {
  return method({
    path: getURL(`tasks/${id}`),
    method: "DELETE",
  });
}

export function patchTask(id: number, updateFields: Partial<Task>) {
  return method<Task>({
    path: getURL(`tasks/${id}`),
    method: "PATCH",
    body: updateFields,
  });
}
