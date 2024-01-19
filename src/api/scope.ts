import { Scope } from "@prisma/client";

import { method, getApiURL } from ".";

export function methodGetScopes() {
  return method<Scope[]>({
    path: getApiURL("scope"),
    fetchOptions: {
      next: { tags: ["scope"] },
    },
  });
}
