import React, { useEffect, useState } from "react";
import API_BASE_URL from "./../baseURL";

const WhatsAppQR = () => {
  const [status, setStatus] = useState("loading");
  const [qrCode, setQrCode] = useState(null);
  const [message, setMessage] = useState("");

  const fetchQRStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/whatsappQR`);
      const data = await response.json();
      console.log(data);

      if (data.status === "connected") {
        setStatus("connected");
        setMessage(data.message);
      } else if (data.status === "disconnected") {
        setStatus("disconnected");
        setQrCode(data.qr);
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error fetching QR status:", error);
      setStatus("error");
      setMessage("Failed to fetch QR status.");
    }
  };

  useEffect(() => {
    fetchQRStatus();
    console.log("Fetched QR Code:", qrCode);

    // Set interval to call the API every 10 seconds
    const interval = setInterval(fetchQRStatus, 1000); // 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [qrCode]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WhatsApp Device Connection Status</h1>
      {status === "connected" && <p>{message}</p>}
      {status === "disconnected" && (
        <>
          <p>Device is not connected. Scan the QR code below:</p>
          <img
            src={qrCode || ""}
            alt="QR Code"
            style={{ width: "300px", height: "300px" }}
          />
        </>
      )}
      {status === "error" && <p>{message}</p>}
      {status === "loading" && <p>Loading...</p>}
    </div>
  );
};

export default WhatsAppQR;
