import { Scope } from "@prisma/client";

import { method, getURL } from ".";

export function methodGetScopes() {
  return method<Scope[]>({
    path: getURL("scope"),
    fetchOptions: {
      next: { tags: ["scope"] },
    },
  });
}
