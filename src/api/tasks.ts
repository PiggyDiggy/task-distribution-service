import { Task } from "@prisma/client";

import { method, getURL } from ".";

export const processTask = ({ createdAt, deadline, ...rest }: Task) => ({
  deadline: new Date(deadline),
  createdAt: new Date(createdAt),
  ...rest,
});

export function methodGetTasks(params?: Record<string, any>) {
  return method<Task[]>({
    path: getURL("tasks"),
    params,
    process(response) {
      return response.map(processTask);
    },
    fetchOptions: {
      next: { tags: ["tasks"] },
    },
  });
}

export type CreateTaskBody = Omit<Task, "id" | "status" | "executorId" | "createdAt">;

export function methodCreateTask(task: CreateTaskBody) {
  return method<Task>({
    path: getURL("tasks"),
    method: "POST",
    body: task,
    process: processTask,
  });
}

export function methodDeleteTask(id: number) {
  return method({
    path: getURL(`tasks/${id}`),
    method: "DELETE",
  });
}

export type PatchTaskBody = Partial<Task>;

export function methodPatchTask(id: number, updateFields: PatchTaskBody) {
  return method<Task>({
    path: getURL(`tasks/${id}`),
    method: "PATCH",
    body: updateFields,
  });
}
