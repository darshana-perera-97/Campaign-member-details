const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const express = require("express");

const router = express.Router();
let qrCodeImage = "";

// Create WhatsApp client instance
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"],
    timeout: 60000,
  },
});

// Event: QR Code generation
client.on("qr", async (qr) => {
  console.log("QR Code generated.");
  qrCodeImage = await qrcode.toDataURL(qr);
});

// Event: Client ready
client.on("ready", () => {
  console.log("WhatsApp client is ready!");
  qrCodeImage = ""; // Clear the QR code
});

// Event: Client disconnected
client.on("disconnected", (reason) => {
  console.log("Client was logged out:", reason);
});

client.initialize().catch((error) => {
  console.error("Failed to initialize WhatsApp client:", error);
});

// Routes
router.get("/whatsappQR", (req, res) => {
  console.log("QR Code request received.");
  if (client.info && client.info.pushname) {
    res.status(200).send({
      status: "connected",
      message: `Device is connected as ${client.info.pushname}.`,
    });
  } else if (qrCodeImage) {
    console.log("Sending QR code to client.");
    res.status(200).send({
      status: "disconnected",
      qr: qrCodeImage,
    });
  } else {
    console.log("QR Code not available.");
    res.status(500).send({
      status: "error",
      message: "QR Code not available. Please try again later.",
    });
  }
});


// File upload handling with Multer
const upload = multer({ dest: "uploads/" });

router.post("/send-messages", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const { message } = req.body;

  if (!message) {
    return res.status(400).send("Message is required.");
  }

  const messages = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const phone = row["designation"];
      if (phone) messages.push(phone);
    })
    .on("end", async () => {
      fs.unlinkSync(filePath);

      for (const phone of messages) {
        try {
          await client.sendMessage("94" + phone + "@c.us", message);
          console.log(`Message sent to ${phone}`);
        } catch (error) {
          console.error(`Failed to send message to ${phone}:`, error);
        }
      }
      res.status(200).send("Messages sent successfully!");
    })
    .on("error", (error) => {
      console.error("Error processing CSV file:", error);
      res.status(500).send("Failed to process CSV file.");
    });
});

module.exports = router;
