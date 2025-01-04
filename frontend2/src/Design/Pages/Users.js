import React from "react";
import AddMemberForm from "../Layouts/AddMemberForm";
import MemberList from "../Layouts/MemberList";
import ViewMembers from "../Components/ViewMembers";
import TopBar from "../Components/TopBar";
import UserList from "../Components/UserList";

export default function Users() {
  return (
    <div>
      <TopBar />
      <UserList />
    </div>
  );
}
