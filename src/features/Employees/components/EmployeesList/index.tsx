import { observer } from "mobx-react-lite";

import { useStore } from "@/lib/mobx/provider";
import { EmployeeWidget } from "@/components/Employee/EmployeeWidget";

export const EmployeesList = observer(function EmployeesList() {
  const { staffStore } = useStore();

  return (
    <>
      {staffStore.employeesList.map((employeeId) => (
        <EmployeeWidget employee={staffStore.getEmployee(employeeId)} key={employeeId} />
      ))}
    </>
  );
});
