import { getScopes } from "@/lib/prisma/api/scope";
import { getEmployees } from "@/lib/prisma/api/staff";
import { getTasks } from "@/lib/prisma/api/tasks";

import { methodGetTasks } from "./tasks";
import { methodGetEmployees } from "./staff";
import { methodGetScopes } from "./scope";

export const getInitialState = () => {
  const promises = process.env.USE_PYTHON_SERVER
    ? ([methodGetTasks(), methodGetEmployees(), methodGetScopes()] as const)
    : ([getTasks(), getEmployees(), getScopes()] as const);

  return Promise.all(promises);
};
