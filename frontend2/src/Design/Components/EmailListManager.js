import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Alert, Spinner, ListGroup, Container, Row, Col } from "react-bootstrap";
import API_BASE_URL from "./../baseURL";

const EmailListManager = () => {
  const [emailList, setEmailList] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch email list when component mounts
  useEffect(() => {
    const fetchEmailList = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/emailList`);
        const data = await response.json();
        if (data.success) {
          setEmailList(data.emailList);
        }
      } catch (error) {
        setError("Failed to fetch email list.");
      }
    };
    fetchEmailList();
  }, []);

  // Add email to the list
  const handleAddEmail = async () => {
    if (!newEmail) {
      setError("Email cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/emailList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add",
          email: newEmail,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setEmailList(data.emailList);
        setNewEmail(""); // Clear input field
        setError(""); // Reset error message
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to add email.");
    }
    setLoading(false);
  };

  // Remove email from the list
  const handleRemoveEmail = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/emailList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "remove",
          email,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setEmailList(data.emailList);
        setError(""); // Reset error message
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to remove email.");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Email List Manager</h2>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          <InputGroup className="mb-3">
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter email to add"
              aria-label="New email"
            />
            <Button variant="primary" onClick={handleAddEmail} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Add Email"}
            </Button>
          </InputGroup>
          <h5 className="mt-4">Current Email List</h5>
          {emailList.length > 0 ? (
            <ListGroup>
              {emailList.map((email) => (
                <ListGroup.Item key={email} className="d-flex justify-content-between align-items-center">
                  {email}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveEmail(email)}
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : "Remove"}
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">No emails in the list.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EmailListManager;
