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

// File paths
const dataFilePath = path.join(__dirname, "submittedData.json");
const communitiesFilePath = path.join(__dirname, "communities.json");

// Ensure data files exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

if (!fs.existsSync(communitiesFilePath)) {
  fs.writeFileSync(communitiesFilePath, JSON.stringify([]));
}

// Save form data
app.post("/submit", (req, res) => {
  const formData = req.body;

  // Validate NIC field
  if (!formData || !formData.nic) {
    return res.status(400).json({ message: "NIC is required." });
  }

  try {
    const existingData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

    // Normalize NIC for comparison
    const duplicateNIC = existingData.some(
      (data) =>
        data.nic.trim().toLowerCase() === formData.nic.trim().toLowerCase()
    );

    console.log("Checking NIC:", formData.nic, "| Duplicate:", duplicateNIC);

    if (duplicateNIC) {
      return res
        .status(409)
        .json({ message: "NIC already exists. Submission rejected." });
    }

    // Save new data
    existingData.push(formData);
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    console.log("New entry added successfully:", formData);
    res.status(200).json({ message: "Form data saved successfully." });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ message: "Failed to save form data." });
  }
});

// Get submitted data
app.get("/data", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read data" });
  }
});

// Get all communities
app.get("/communities", (req, res) => {
  try {
    const communities = JSON.parse(
      fs.readFileSync(communitiesFilePath, "utf8")
    );
    res.status(200).json(communities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read communities data" });
  }
});

// Add a new community
app.post("/communities", (req, res) => {
  const community = req.body;

  if (
    !community ||
    !community.name ||
    !community.gsDivision ||
    !community.agaDivision
  ) {
    return res.status(400).json({ message: "Invalid community data" });
  }

  try {
    const communities = JSON.parse(
      fs.readFileSync(communitiesFilePath, "utf8")
    );
    communities.push(community);
    fs.writeFileSync(communitiesFilePath, JSON.stringify(communities, null, 2));
    res.status(201).json({ message: "Community added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add community" });
  }
});

// Update a community
app.put("/communities/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCommunity = req.body;

  try {
    const communities = JSON.parse(
      fs.readFileSync(communitiesFilePath, "utf8")
    );
    const index = communities.findIndex((_, idx) => idx === id);

    if (index === -1) {
      return res.status(404).json({ message: "Community not found" });
    }

    communities[index] = updatedCommunity;
    fs.writeFileSync(communitiesFilePath, JSON.stringify(communities, null, 2));
    res.status(200).json({ message: "Community updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update community" });
  }
});

// Delete a community
app.delete("/communities/:id", (req, res) => {
  const id = parseInt(req.params.id);

  try {
    let communities = JSON.parse(fs.readFileSync(communitiesFilePath, "utf8"));
    communities = communities.filter((_, idx) => idx !== id);
    fs.writeFileSync(communitiesFilePath, JSON.stringify(communities, null, 2));
    res.status(200).json({ message: "Community deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete community" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
