export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT" | "OPTIONS";
