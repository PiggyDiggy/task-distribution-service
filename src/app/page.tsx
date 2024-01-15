import { RootStoreProvider } from "@/lib/mobx/provider";
import { Section } from "@/components/ui/Section";
import { Tasks } from "@/features/Tasks";
import { Employees } from "@/features/Employees";
import { DistributeButton } from "@/features/DistributeButton";
import { getInitialState } from "@/api/getInitialState";

import styles from "./page.module.css";

export default async function Home() {
  const [tasks, employees, scopes] = await getInitialState();

  return (
    <main className={styles.main}>
      <RootStoreProvider tasks={tasks} employees={employees} scopes={scopes}>
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
