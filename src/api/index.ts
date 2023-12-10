import { RequestMethod } from "@/types";

export function getURL(path: string) {
  const origin = typeof global.window === "undefined" ? process.env.origin : window.location.origin;
  return `${origin}/api/${path}`;
}

export async function method<R>({
  path,
  method = "GET",
  body,
  params,
  fetchOptions = {},
}: {
  path: string;
  method?: RequestMethod;
  body?: Record<string, any>;
  params?: Record<string, any>;
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
    return response.json();
  }

  return null as R;
}
