import React, { useEffect, useState } from "react";
import API_BASE_URL from "./../baseURL";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
  Alert,
} from "react-bootstrap";

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
    const interval = setInterval(fetchQRStatus, 10000); // 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [qrCode]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow-lg">
            <Card.Header as="h5" className="bg-primary text-white">
              WhatsApp Device Connection Status
            </Card.Header>
            <Card.Body>
              {status === "loading" && (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              {status === "connected" && (
                <Alert variant="success">
                  <p className="mb-0">{message}</p>
                </Alert>
              )}
              {status === "disconnected" && (
                <>
                  <Alert variant="warning">
                    <p>Device is not connected. Scan the QR code below:</p>
                  </Alert>
                  {qrCode && (
                    <img
                      src={qrCode}
                      alt="QR Code"
                      style={{ width: "300px", height: "300px" }}
                      className="img-fluid rounded border"
                    />
                  )}
                  <Button
                    variant="secondary"
                    className="mt-3"
                    onClick={fetchQRStatus}
                  >
                    Refresh QR Code
                  </Button>
                </>
              )}
              {status === "error" && (
                <Alert variant="danger">
                  <p>{message}</p>
                </Alert>
              )}
            </Card.Body>
            <Card.Footer className="text-muted">
              Status: <strong>{status.toUpperCase()}</strong>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WhatsAppQR;
