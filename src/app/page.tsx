import { getTasks } from "@/api/tasks";
import { getEmployees } from "@/api/staff";
import { RootStoreProvider } from "@/lib/mobx/provider";

import styles from "./page.module.css";

export default async function Home() {
  const [tasks, employees] = await Promise.all([getTasks(), getEmployees()]);

  return (
    <main className={styles.main}>
      <RootStoreProvider tasks={tasks} employees={employees}></RootStoreProvider>
    </main>
  );
}
