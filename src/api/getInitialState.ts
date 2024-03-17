import { getScopes } from "@/lib/prisma/api/scope";
import { getEmployees } from "@/lib/prisma/api/staff";
import { getTasks } from "@/lib/prisma/api/tasks";

import { methodGetTasks } from "./tasks";
import { methodGetEmployees } from "./staff";
import { methodGetScopes } from "./scope";

const getEmptyArray = () => [];

export const getInitialState = () => {
  if (process.env.USE_PYTHON_SERVER) {
    return Promise.all([
      methodGetTasks().catch(getEmptyArray),
      methodGetEmployees().catch(getEmptyArray),
      methodGetScopes().catch(getEmptyArray),
    ])
  }

  return Promise.all([
    getTasks().catch(getEmptyArray),
    getEmployees().catch(getEmptyArray),
    getScopes().catch(getEmptyArray),
  ]);
};
