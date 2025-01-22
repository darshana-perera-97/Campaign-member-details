import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import API_BASE_URL from "./../baseURL";

const CsvUpload = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [variant, setVariant] = useState(""); // Alert variant

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !message) {
      setVariant("warning");
      setResponseMessage("Please provide a CSV file and a message.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(`${API_BASE_URL}/send-messages`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setVariant("success");
        setResponseMessage("Messages sent successfully!");
      } else {
        setVariant("danger");
        setResponseMessage("Failed to send messages. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setVariant("danger");
      setResponseMessage("Error uploading file.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Send Messages via CSV</h1>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select CSV File</Form.Label>
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Optional Image</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Enter Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" onClick={handleUpload}>
                Upload and Send
              </Button>
            </div>
          </Form>
          {responseMessage && (
            <Alert className="mt-3" variant={variant}>
              {responseMessage}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CsvUpload;
