import { observer } from "mobx-react-lite";

import { TaskWidgetSkeleton } from "@/components/Task/TaskWidget";
import { useStore } from "@/lib/mobx/provider";

export const LoadingTasksList = observer(function LoadingTasksList() {
  const {
    tasksStore: { loadingTasks },
  } = useStore();

  return (
    <>
      {loadingTasks.map((task) => (
        <TaskWidgetSkeleton key={task.id} task={task} />
      ))}
    </>
  );
});
