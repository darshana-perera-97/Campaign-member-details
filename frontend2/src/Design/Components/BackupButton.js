import React from "react";
import API_BASE_URL from "./../baseURL";

const BackupButton = () => {
  const handleBackup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/backupNow`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Display success message
      } else {
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Backup process completed.");
    }
  };

  return (
    <div className="text-center mt-4">
      <h2 className="text-center mb-4">Backup your database Now</h2>
      <button onClick={handleBackup} className="btn btn-success btn-lg mt-2">
        Backup Now
      </button>
    </div>
  );
};

export default BackupButton;
