import React from "react";
import Navbar from "../Components/Navbar";
import SavedDataTable from "../Components/MemberList";
import ViewMembers from "../Components/ViewMembers";
import TopBar from "../Components/TopBar";

export default function ViewAll() {
  return (
    <div>
      <TopBar />
      <ViewMembers />
    </div>
  );
}
