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

export function createEmployee(employee: Omit<Employee, "id">) {
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

export function patchEmployee(id: number, updateFields: Partial<Employee>) {
  return method<Employee>({
    path: getURL(`staff/${id}`),
    method: "PATCH",
    body: updateFields,
  });
}
