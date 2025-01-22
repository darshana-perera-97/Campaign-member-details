const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const express = require("express");
const path = require("path");

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

client.on("qr", async (qr) => {
  console.log("QR Code generated.");
  qrCodeImage = await qrcode.toDataURL(qr);
});

client.on("ready", () => {
  console.log("WhatsApp client is ready!");
  qrCodeImage = "";
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out:", reason);
});

client.initialize().catch((error) => {
  console.error("Failed to initialize WhatsApp client:", error);
});

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const filetypes = /csv|jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only .csv, .jpeg, .jpg, and .png files are allowed!"));
    }
  },
});

router.get("/whatsappQR", (req, res) => {
  if (client.info && client.info.pushname) {
    res.status(200).send({
      status: "connected",
      message: `Device is connected as ${client.info.pushname}.`,
    });
  } else if (qrCodeImage) {
    res.status(200).send({
      status: "disconnected",
      qr: qrCodeImage,
    });
  } else {
    res.status(500).send({
      status: "error",
      message: "QR Code not available. Please try again later.",
    });
  }
});

router.post(
  "/send-messages",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  (req, res) => {
    const filePath = req.files?.file?.[0]?.path;
    const imageFile = req.files?.image?.[0]?.path; // Optional image file
    const { message } = req.body;

    if (!message) {
      return res.status(400).send("Message is required.");
    }

    if (!filePath) {
      return res.status(400).send("CSV file is required.");
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
            if (imageFile) {
              if (fs.existsSync(imageFile)) {
                const ext = path.extname(imageFile).slice(1);
                const mimeType = `image/${ext}`;
                const media = MessageMedia.fromFilePath(imageFile);
                media.mimetype = mimeType;
                media.filename = path.basename(imageFile);

                await client.sendMessage(`94${phone}@c.us`, media, {
                  caption: message,
                });
                console.log(`Message sent to ${phone} with image.`);
              } else {
                console.error(
                  `Image file does not exist at path: ${imageFile}`
                );
              }
            } else {
              await client.sendMessage(`94${phone}@c.us`, message);
              console.log(`Message sent to ${phone}`);
            }
          } catch (error) {
            console.error(`Failed to send message to ${phone}:`, error);
          }
        }

        if (imageFile) fs.unlinkSync(imageFile);

        res.status(200).send("Messages sent successfully!");
      })
      .on("error", (error) => {
        console.error("Error processing CSV file:", error);
        res.status(500).send("Failed to process CSV file.");
      });
  }
);

module.exports = router;
