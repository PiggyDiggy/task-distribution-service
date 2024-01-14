import { observer } from "mobx-react-lite";

import { TaskWidget } from "@/components/Task/TaskWidget";
import { useStore } from "@/lib/mobx/provider";

export const TasksList = observer(function TasksList() {
  const { tasksStore } = useStore();

  return (
    <>
      {tasksStore.undistributedTasks.map((taskId) => (
        <TaskWidget key={taskId} task={tasksStore.getTask(taskId)} />
      ))}
    </>
  );
});
