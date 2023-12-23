import { Employee } from "@prisma/client";
import { method, getURL } from ".";

export function getEmployees(params?: Record<string, any>) {
  return method<Employee[]>({
    path: getURL("staff"),
    params,
    fetchOptions: {
      next: { tags: ["staff"] },
    },
  });
}

export type CreateEmployeeBody = Omit<Employee, "id">;

export function createEmployee(employee: CreateEmployeeBody) {
  return method<Employee>({
    path: getURL("staff"),
    method: "POST",
    body: employee,
  });
}

export function deleteEmployee(id: number) {
  return method({
    path: getURL(`staff/${id}`),
    method: "DELETE",
  });
}

export type PatchEmployeeBody = Partial<Employee>;

export function patchEmployee(id: number, updateFields: PatchEmployeeBody) {
  return method<Employee>({
    path: getURL(`staff/${id}`),
    method: "PATCH",
    body: updateFields,
  });
}
