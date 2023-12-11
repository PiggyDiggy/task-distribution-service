import { getTasks } from "@/api/tasks";
import { getEmployees } from "@/api/staff";
import { RootStoreProvider } from "@/lib/mobx/provider";
import { TasksList } from "@/components/TasksList";
import { Section } from "@/components/Section";
import { EmployeesList } from "@/components/EmployeesList";

import styles from "./page.module.css";

export default async function Home() {
  const [openTasks, employees] = await Promise.all([getTasks({ status: "open" }), getEmployees()]);
  const employeeTasks = await Promise.all(
    employees.map((employee) => getTasks({ executor: employee.id, status: "inProgress" }))
  );

  return (
    <main className={styles.main}>
      <RootStoreProvider openTasks={openTasks} employees={employees} employeeTasks={employeeTasks}>
        <Section className="container" title="Открытые задачи" align="center">
          <TasksList />
        </Section>
        <Section titleClassName="container" title="Сотрудники">
          <EmployeesList />
        </Section>
      </RootStoreProvider>
    </main>
  );
}
