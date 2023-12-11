import { getTasks } from "@/api/tasks";
import { getEmployees } from "@/api/staff";
import { RootStoreProvider } from "@/lib/mobx/provider";
import { TasksList } from "@/components/TasksList";
import { Section } from "@/components/Section";
import { EmployeesList } from "@/components/EmployeesList";

import styles from "./page.module.css";

export default async function Home() {
  const [tasks, employees] = await Promise.all([getTasks(), getEmployees()]);

  return (
    <main className={styles.main}>
      <RootStoreProvider tasks={tasks} employees={employees}>
        <div className="container">
          <Section title="Открытые задачи" align="center">
            <TasksList />
          </Section>
        </div>
      </RootStoreProvider>
    </main>
  );
}
