import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import API_BASE_URL from "./../baseURL";

const ScheduleBackup = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [error, setError] = useState("");

  // Handle day selection
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  // Handle hours input change
  const handleHoursChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 24) {
      setHours(value);
    }
  };

  // Handle minutes input change
  const handleMinutesChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 60) {
      setMinutes(value);
    }
  };

  // Submit the data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!selectedDay || hours === "" || minutes === "") {
      setError("Please select a day and enter a valid time.");
      return;
    }

    if (hours < 0 || hours > 24 || minutes < 0 || minutes > 60) {
      setError(
        "Please enter a valid time. Hours must be between 0 and 24, minutes between 0 and 60."
      );
      return;
    }

    // Prepare data
    const data = { day: selectedDay, time: `${hours}:${minutes}` };

    try {
      const response = await fetch(`${API_BASE_URL}/scheduleBackup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setError(""); // Clear previous errors
        alert("Backup scheduled successfully!");
      } else {
        setError("Failed to schedule backup.");
      }
    } catch (error) {
      setError("Error sending data.");
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Schedule Backup</h2>
      <Form onSubmit={handleSubmit}>
        {/* Day selection */}
        <Row className="mb-3">
          <Col md={6} className="offset-md-3">
            <Form.Group>
              <Form.Label>Select a day:</Form.Label>
              <div className="d-flex flex-wrap">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <Form.Check
                    inline
                    type="radio"
                    label={day}
                    name="day"
                    value={day}
                    checked={selectedDay === day}
                    onChange={handleDayChange}
                    key={day}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Time selection */}
        <Row className="mb-3">
          <Col md={6} className="offset-md-3">
            <Form.Group>
              <Form.Label>Enter time:</Form.Label>
              <div className="d-flex justify-content-center align-items-center">
                <Form.Control
                  type="number"
                  value={hours}
                  onChange={handleHoursChange}
                  placeholder="HH"
                  min="0"
                  max="24"
                  className="me-2 text-center"
                  style={{ maxWidth: "80px" }}
                />
                <span className="mx-2">:</span>
                <Form.Control
                  type="number"
                  value={minutes}
                  onChange={handleMinutesChange}
                  placeholder="MM"
                  min="0"
                  max="60"
                  className="ms-2 text-center"
                  style={{ maxWidth: "80px" }}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row className="mb-3">
          <Col md={6} className="offset-md-3">
            <Button variant="primary" type="submit" block>
              Schedule Backup
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Error Message */}
      {error && (
        <Row className="mt-3">
          <Col md={6} className="offset-md-3">
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ScheduleBackup;
