import { getTasks } from "@/lib/prisma/api/tasks";
import { getEmployees } from "@/lib/prisma/api/staff";
import { getScopes } from "@/lib/prisma/api/scope";
import { RootStoreProvider } from "@/lib/mobx/provider";
import { Tasks } from "@/components/Tasks";
import { Section } from "@/components/Section";
import { Employees } from "@/components/Employees";
import { DistributeButton } from "@/components/DistributeButton";

import styles from "./page.module.css";

export const fetchCache = "force-no-store";

export default async function Home() {
  const [openTasks, employees, scopes] = await Promise.all([getTasks({ status: "open" }), getEmployees(), getScopes()]);

  const employeeTasks = await Promise.all(
    employees.map((employee) => getTasks({ executor: employee.id, status: "inProgress" }))
  );

  return (
    <main className={styles.main}>
      <RootStoreProvider openTasks={openTasks} employees={employees} employeeTasks={employeeTasks} scopes={scopes}>
        <Section className="container" title="Открытые задачи" align="center">
          <Tasks />
        </Section>
        <Section titleClassName="container" title="Сотрудники">
          <Employees />
        </Section>
        <DistributeButton />
      </RootStoreProvider>
    </main>
  );
}
