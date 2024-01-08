import { observer } from "mobx-react-lite";

import { TaskWidget } from "@/components/TaskWidget";
import { useStore } from "@/lib/mobx/provider";

export const LoadingTasksList = observer(function LoadingTasksList() {
  const {
    tasksStore: { loadingTasks },
  } = useStore();

  return (
    <>
      {loadingTasks.map((task) => (
        <TaskWidget key={task.id} task={task} loading />
      ))}
    </>
  );
});
