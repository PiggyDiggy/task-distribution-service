import { RequestMethod } from "@/types";

export function getURL(path: string) {
  const { PROTOCOL: protocol, NEXT_PUBLIC_API_URL: host } = process.env;

  const origin = typeof global.window === "undefined" ? `${protocol}://${host}` : "";
  return `${origin}/api/${path}`;
}

export async function method<T, R = T>({
  path,
  method = "GET",
  body,
  params,
  process,
  fetchOptions = {},
}: {
  path: string;
  method?: RequestMethod;
  body?: Record<string, any>;
  params?: Record<string, any>;
  process?: (response: T) => R;
  fetchOptions?: RequestInit;
}): Promise<R> {
  const requestInit = { ...fetchOptions, method };
  if (body) {
    requestInit.body = JSON.stringify(body);
  }
  const paramsString = new URLSearchParams(params).toString();
  const response = await fetch(`${path}${paramsString && "?" + paramsString}`, requestInit);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (response.headers.get("content-type") === "application/json") {
    const json = await response.json();
    return process?.(json) || json;
  }

  return null as R;
}
