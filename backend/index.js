const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data file
const dataFilePath = path.join(__dirname, "submittedData.json");

// Ensure the data file exists
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// Save form data
app.post("/submit", (req, res) => {
  const formData = req.body;

  if (!formData) {
    return res.status(400).json({ message: "Invalid form data" });
  }

  try {
    // Read existing data
    const existingData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

    // Add the new data
    existingData.push(formData);

    // Save back to the file
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    res.status(200).json({ message: "Form data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save form data" });
  }
});

// Get submitted data (for testing or displaying)
app.get("/data", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
