import React from "react";
import DashboardCardView from "../Layouts/DashboardCardView";
import MemberList from "../Components/MemberList";
import SavedDataTable from "../Components/SavedDataTable";
import TopBar from "../Components/TopBar";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <DashboardCardView />
      {/* <MemberList /> */}
      {/* <SavedDataTable /> */}
    </div>
  );
}
