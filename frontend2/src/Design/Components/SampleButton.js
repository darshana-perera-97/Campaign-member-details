import React from "react";
import Button from "react-bootstrap/Button";

export default function SampleButton() {
  return (
    <div>
      {" "}
      <Button as="a" variant="success">
        Button as link
      </Button>
    </div>
  );
}
