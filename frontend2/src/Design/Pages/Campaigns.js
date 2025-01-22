import React, { useState } from "react";
import TopBar from "../Components/TopBar";
import BulkMessageSender from "../Components/BulkMessageSender";
import { Tab, Tabs } from "react-bootstrap"; // Import necessary components
import WhatsappBulk from "../Layouts/WhatsappBulk";

export default function Campaigns() {
  const [key, setKey] = useState("sendMessages"); // State for active tab

  return (
    <div>
      <TopBar />

      <Tabs
        id="campaign-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="sendMessages" title="Send Messages">
          <BulkMessageSender />
        </Tab>
        {/* Add another Tab for a different content */}
        <Tab eventKey="otherCampaigns" title="WhatsApp Campaigns">
          <WhatsappBulk />
        </Tab>
      </Tabs>
    </div>
  );
}
