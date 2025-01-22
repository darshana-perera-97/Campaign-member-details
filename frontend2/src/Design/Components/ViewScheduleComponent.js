import React, { useEffect, useState } from "react";
import { Spinner, Alert, Card, Container, Row, Col } from "react-bootstrap";
import API_BASE_URL from "./../baseURL";

const ViewScheduleComponent = () => {
  const [schedule, setSchedule] = useState({ Day: "", Time: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch schedule from the API
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getTime`);

        if (!response.ok) {
          throw new Error("Failed to fetch schedule.");
        }

        const data = await response.json();
        setSchedule(data); // Set Day and Time
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred.");
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p>Loading schedule...</p>
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          ) : (
            <Card className="text-center shadow">
              <Card.Header as="h4" className="bg-primary text-white">
                Current Schedule
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Day:</strong> {schedule.Day}
                </Card.Text>
                <Card.Text>
                  <strong>Time:</strong> {schedule.Time}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewScheduleComponent;
