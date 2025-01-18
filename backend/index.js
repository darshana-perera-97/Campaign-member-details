const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File paths
const dataFilePath = path.join(__dirname, "submittedData.json");
const communitiesFilePath = path.join(__dirname, "communities.json");
const usersFilePath = path.join(__dirname, "users.json");

// Ensure data files exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

if (!fs.existsSync(communitiesFilePath)) {
  fs.writeFileSync(communitiesFilePath, JSON.stringify([]));
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log(`User Logged In: ${username}, Role: ${user.role}`); // Log role in backend
      res.status(200).json({ role: user.role, message: "Login successful" });
    } else {
      console.log(`Failed Login Attempt: ${username}`);
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/update-password", (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
    const userIndex = users.findIndex(
      (user) => user.username === username && user.password === oldPassword
    );

    if (userIndex === -1) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    users[userIndex].password = newPassword;
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users
app.get("/users", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
    // Do not send passwords in the response for security reasons
    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
    res.status(200).json(usersWithoutPasswords);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Save form data
app.post("/submit", (req, res) => {
  const formData = req.body;

  // Validate NIC field
  if (!formData || !formData.nic) {
    return res.status(400).json({ message: "NIC is required." });
  }

  try {
    // Read existing data from the database (file)
    const existingData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

    // Check for duplicate NIC
    const duplicateNIC = existingData.some(
      (data) =>
        data.nic.trim().toLowerCase() === formData.nic.trim().toLowerCase()
    );

    if (duplicateNIC) {
      return res
        .status(409)
        .json({ message: "NIC already exists. Submission rejected." });
    }

    // Generate a Graduation ID
    const nextIdNum = (existingData.length + 1).toString().padStart(5, "0");

    // formData.graduationId = nextId;

    console.log("Data saved " + nextIdNum);

    function generateNextId(formData, nextIdNum) {
      const regionPrefix =
        formData.region?.sub?.substring(0, 2).toUpperCase() || "XX";
      const gsPrefix =
        formData.gsDivision?.value?.substring(0, 2).toUpperCase() || "XX";
      return `${regionPrefix}-${gsPrefix}-${nextIdNum}`;
    }

    formData.RegID = generateNextId(formData, nextIdNum);

    console.log(formData.RegID);
    existingData.push(formData);

    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    res.status(200).json({
      message: "Form data saved successfully.",
      graduationId: nextIdNum,
    });
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
