import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import API_BASE_URL from "./../baseURL";

const UpdateTimeForm = () => {
  const [hh, setHh] = useState("");
  const [mm, setMm] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch saved time data on component mount
  useEffect(() => {
    const fetchSavedTime = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-time-data`);
        const data = await response.json();

        if (response.ok) {
          setHh(data.HH || "");
          setMm(data.MM || "");
          setMessage(data.Message || "");
          setLoading(false);
        } else {
          setResponseMessage("Failed to fetch saved time.");
        }
      } catch (error) {
        console.error("Error fetching saved time:", error);
        setResponseMessage("Server error. Please try again later.");
      }
    };

    fetchSavedTime();
  }, []);

  // Validate hour and minute input
  const validateTimeInput = (value, min, max) => {
    if (/^\d*$/.test(value)) {
      const num = parseInt(value, 10);
      if (num >= min && num <= max) {
        return value;
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hh || !mm || !message) {
      setResponseMessage("All fields are required.");
      return;
    }

    // Validate HH and MM values
    if (
      parseInt(hh) < 0 ||
      parseInt(hh) > 23 ||
      parseInt(mm) < 0 ||
      parseInt(mm) > 59
    ) {
      setResponseMessage(
        "Invalid time. HH should be 0-23 and MM should be 0-59."
      );
      return;
    }

    const timeData = {
      HH: hh.padStart(2, "0"), // Ensure two-digit format
      MM: mm.padStart(2, "0"), // Ensure two-digit format
      Message: message,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/update-time`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timeData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Time updated successfully!");
        window.alert("Time updated successfully!");
      } else {
        setResponseMessage(data.message || "Failed to update time.");
      }
    } catch (error) {
      console.error("Error updating time:", error);
      setResponseMessage("Server error. Please try again later.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">Update Scheduled Time</h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Hour (HH):</Form.Label>
                <Form.Control
                  type="text"
                  value={hh}
                  onChange={(e) =>
                    setHh(validateTimeInput(e.target.value, 0, 23))
                  }
                  placeholder="0-23"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Minute (MM):</Form.Label>
                <Form.Control
                  type="text"
                  value={mm}
                  onChange={(e) =>
                    setMm(validateTimeInput(e.target.value, 0, 59))
                  }
                  placeholder="0-59"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter a message"
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button type="submit" variant="primary">
                  Update Time
                </Button>
              </div>
            </Form>
          )}
          {responseMessage && (
            <Alert
              variant={
                responseMessage.includes("successfully") ? "success" : "danger"
              }
              className="mt-4"
            >
              {responseMessage}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateTimeForm;
