import { Scope } from "@prisma/client";

import { method, getURL } from ".";

export function getScopes() {
  return method<Scope[]>({ path: getURL("scope") });
}
