import React from "react";
import { Tab, Nav } from "react-bootstrap";
import TopBar from "../Components/TopBar";
import Backup from "./Backup";
import BirthdaySetup from "../Layouts/BirthdaySetup";
import WhatsappBulk from "../Layouts/WhatsappBulk";

export default function Settings() {
  return (
    <div>
      <TopBar />
      <div className="container mt-4">
        <Tab.Container defaultActiveKey="backup">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="backup">Backup</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="birthdaySetup">Birthday Setup</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="whatsappBulk">WhatsApp Bulk</Nav.Link>
            </Nav.Item> */}
          </Nav>
          <Tab.Content className="mt-3">
            <Tab.Pane eventKey="backup">
              <Backup />
            </Tab.Pane>
            <Tab.Pane eventKey="birthdaySetup">
              <BirthdaySetup />
            </Tab.Pane>
            {/* <Tab.Pane eventKey="whatsappBulk">
              <WhatsappBulk />
            </Tab.Pane> */}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}
