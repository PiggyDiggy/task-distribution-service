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

export type CreateEmployeeBody = Omit<Employee, "id" | "photo">;

export function methodCreateEmployee(employee: CreateEmployeeBody) {
  return method<Employee>({
    path: getURL("staff"),
    method: "POST",
    body: employee,
  });
}

export function methodDeleteEmployee(id: string) {
  return method<null>({
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

type UnsplashResponse = {
  urls: {
    thumb: string;
  };
};

export function methodUnsplashRandomPhoto() {
  return method<UnsplashResponse, string>({
    path: "https://api.unsplash.com/photos/random",
    fetchOptions: { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}` } },
    process(response) {
      return response.urls.thumb;
    },
  });
}
