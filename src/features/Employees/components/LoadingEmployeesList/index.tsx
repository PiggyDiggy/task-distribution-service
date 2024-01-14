import { observer } from "mobx-react-lite";

import { EmployeeWidgetSkeleton } from "@/components/Employee/EmployeeWidget";
import { useStore } from "@/lib/mobx/provider";

export const LoadingEmployeesList = observer(function LoadingEmployeesList() {
  const {
    staffStore: { loadingEmployees },
  } = useStore();

  return (
    <>
      {loadingEmployees.map((employee) => (
        <EmployeeWidgetSkeleton employee={employee} key={employee.id} />
      ))}
    </>
  );
});
