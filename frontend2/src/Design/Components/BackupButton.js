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
    <button
      onClick={handleBackup}
      style={{
        padding: "10px 20px",
        background: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Backup Now
    </button>
  );
};

export default BackupButton;
