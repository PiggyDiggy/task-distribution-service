import { Employee } from "@prisma/client";

import { method, getURL } from ".";

export function methodGetEmployees(params?: Record<string, any>) {
  return method<Employee[]>({
    path: getURL("staff"),
    params,
    fetchOptions: {
      next: { tags: ["staff"] },
    },
  });
}

export type CreateEmployeeBody = Omit<Employee, "id">;

export function methodCreateEmployee(employee: CreateEmployeeBody) {
  return method<Employee>({
    path: getURL("staff"),
    method: "POST",
    body: employee,
  });
}

export function methodDeleteEmployee(id: string) {
  return method({
    path: getURL(`staff/${id}`),
    method: "DELETE",
  });
}

export type PatchEmployeeBody = Partial<Employee>;

export function methodPatchEmployee(id: string, updateFields: PatchEmployeeBody) {
  return method<Employee>({
    path: getURL(`staff/${id}`),
    method: "PATCH",
    body: updateFields,
  });
}
