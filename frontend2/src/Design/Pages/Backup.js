import React from "react";
import BackupButton from "../Components/BackupButton";
import EmailListManager from "../Components/EmailListManager";
import ViewScheduleComponent from "../Components/ViewScheduleComponent";
import ScheduleBackup from "../Components/ScheduleBackup";

export default function Backup() {
  return (
    <div>
      <BackupButton />
      <hr />
      <EmailListManager />
      <ViewScheduleComponent />
      <ScheduleBackup />
    </div>
  );
}
