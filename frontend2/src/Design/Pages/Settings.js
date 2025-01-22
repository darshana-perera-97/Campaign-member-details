import React from "react";
import TopBar from "../Components/TopBar";
import Backup from "./Backup";
import BirthdaySetup from "../Layouts/BirthdaySetup";

export default function Settings() {
  return (
    <div>
      <TopBar />
      <h2 className="text-center mb-4 mt-5 pt-5 card-heading">
        DEV Release on Jan 19, 2025
      </h2>
      <Backup />
      <settingsPage />
      <BirthdaySetup />
    </div>
  );
}
