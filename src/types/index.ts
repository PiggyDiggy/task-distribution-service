export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT" | "OPTIONS";

export type RawData<T> = { [P in keyof T]: string };
