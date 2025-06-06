require("dotenv").config();
const mixesPath = path.join(__dirname, "data", "mixes.json");

let djs = []; // in-memory DJ array
let nextId = 1; // simple incremental ID for DJ IDs

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8002;

app.use(cors());
app.use(express.json({ limit: "50mb" })); // <-- increased limit for base64 audio

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.patch("/api/elements/mixes/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const mixes = JSON.parse(fs.readFileSync(mixesPath, "utf-8"));
    const mixIndex = mixes.findIndex(mix => String(mix.id) === id);

    if (mixIndex === -1) {
      return res.status(404).json({ message: "Mix not found" });
    }

    console.log("Updating mix with ID:", mixes[mixIndex].id);

    mixes[mixIndex] = { ...mixes[mixIndex], ...updates };

    fs.writeFileSync(mixesPath, JSON.stringify(mixes, null, 2));

    res.json(mixes[mixIndex]);
  } catch (err) {
    console.error("Error updating mix:", err);
    res.status(500).json({ message: "Error updating mix" });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await db.events.delete(id); // Use actual DB logic here
  if (deleted) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).send({ error: "Event not found" });
  }
});

app.delete('/api/djs/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await db.djs.delete(id); // Use actual DB logic here
  if (deleted) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).send({ error: "Djs not found" });
  }
});

app.delete('/api/mixes/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await db.mixes.delete(id); // Use actual DB logic here
  if (deleted) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).send({ error: "Images not found" });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await db.gallery.delete({
  where: { id: Number(id) }
});
  if (deleted) {
    res.status(204).send(); // No Content
  } else {
    res.status(404).send({ error: "Imagess not found" });
  }
});

// Example backend POST handler (Node/Express-like)
app.post("/api/elements/events", (req, res) => {
  const { title, date, location, description, rsvp_link, artists } = req.body;

  if (!Array.isArray(artists)) {
    return res.status(400).json({ error: "Artists must be an array" });
  }

  // Validate structure of each artist
  for (const artist of artists) {
    if (!artist.name || !artist.time) {
      return res.status(400).json({ error: "Each artist must have name and time" });
    }
  }

  // Proceed to store in DB...
});

app.patch("/api/elements/events/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
    const eventIndex = events.findIndex(event => String(event.id) === id);

    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("Updating mix with ID:", events[eventIndex].id);

    events[eventIndex] = { ...events[eventIndex], ...updates };

    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));

    res.json(events[eventIndex]);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ message: "Error updating event" });
  }
});

// Contact form route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "parkerjeanneallen@gmail.com",
    subject: `New message from ${name}`,
    text: `You got a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending message" });
  }
});

// DJ routes
const djsPath = path.join(__dirname, "data", "djs.json");

// GET all DJs
app.get("/api/elements/djs/", (req, res) => {
  try {
    const djs = JSON.parse(fs.readFileSync(djsPath, "utf-8"));
    res.json(djs);
  } catch (err) {
    res.status(500).json({ message: "Error reading DJ data." });
  }
});

// POST new DJ
app.post("/api/elements/djs/", (req, res) => {
  const { image, artist, description, profileId } = req.body;
  if (!image || !artist || !description || !profileId) {
    return res.status(400).json({ message: "All fields required." });
  }

  try {
    const djs = JSON.parse(fs.readFileSync(djsPath, "utf-8"));
    const maxId = djs.reduce((max, dj) => (dj.id > max ? dj.id : max), 0);
    const newId = maxId + 1;

    const newDJ = { id: newId, image, artist, description, profileId, isSelected: false, isSpotlight: false };
    djs.push(newDJ);
    fs.writeFileSync(djsPath, JSON.stringify(djs, null, 2));
    res.status(201).json(newDJ);
  } catch (err) {
    res.status(500).json({ message: "Error writing DJ data." });
  }
});

// === New route: Upload mixes with base64 audio ===

app.post("/api/elements/mixes/", (req, res) => {
  const { title, artist, audioBase64, audioName } = req.body;
  if (!title || !artist || !audioBase64 || !audioName) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  // Decode base64 string to Buffer
  const audioBuffer = Buffer.from(audioBase64, "base64");

  // Make sure uploads directory exists
  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Create a unique filename
  const safeName = audioName.replace(/[^a-zA-Z0-9.-]/g, "-");
  const filePath = path.join(uploadsDir, `${Date.now()}-${safeName}`);

  // Save the audio file
  fs.writeFile(filePath, audioBuffer, (err) => {
    if (err) {
      console.error("Error saving audio file:", err);
      return res.status(500).json({ message: "Failed to save audio file." });
    }

    // You could also save mix info to a JSON file or DB here if you want

    res.status(201).json({ message: "Mix uploaded successfully!", path: filePath });
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Ouro backend is running.");
});

const eventsPath = path.join(__dirname, "data", "events.json");
const galleryPath = path.join(__dirname, "uploads", "gallery");

// POST event with image base64
app.post("/api/elements", (req, res) => {
  const { title, date, description, imageName, imageBase64 } = req.body;
  if (!title || !date || !description || !imageName || !imageBase64) {
    return res.status(400).json({ message: "Missing required event fields." });
  }

  // Save image file
  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

  const safeName = imageName.replace(/\s+/g, "-");
  const filePath = path.join(uploadsDir, `${Date.now()}-${safeName}`);

  const imageBuffer = Buffer.from(imageBase64, "base64");

  fs.writeFile(filePath, imageBuffer, (err) => {
    if (err) {
      console.error("Error saving event image:", err);
      return res.status(500).json({ message: "Failed to save event image." });
    }

    // Save event info (with image path) to events.json
    try {
      let events = [];
      if (fs.existsSync(eventsPath)) {
        events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
      }

      const newEvent = { title, date, description, imagePath: filePath };
      events.push(newEvent);
      fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2));
      res.status(201).json({ message: "Event uploaded successfully!", event: newEvent });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Failed to save event data." });
    }
  });
});

// POST gallery images (multiple)
app.post("/api/elements/gallery/", (req, res) => {
  const { images } = req.body;
  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ message: "No images provided." });
  }

  const galleryDir = path.join(__dirname, "uploads", "gallery");
  if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });

  const savedImages = [];

  for (const { name, base64 } of images) {
    const safeName = name.replace(/\s+/g, "-");
    const filePath = path.join(galleryDir, `${Date.now()}-${safeName}`);
    const imageBuffer = Buffer.from(base64, "base64");

    try {
      fs.writeFileSync(filePath, imageBuffer);
      savedImages.push(filePath);
    } catch (err) {
      console.error("Error saving gallery image:", err);
      return res.status(500).json({ message: "Failed to save gallery images." });
    }
  }

  res.status(201).json({ message: "Gallery images uploaded!", files: savedImages });
});

app.patch("/api/elements/djs/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Read existing DJs
    const djs = JSON.parse(fs.readFileSync(djsPath, "utf-8"));

    // Find DJ index by id (convert id to number if needed)
    const djIndex = djs.findIndex(dj => String(dj.id) === id);
    if (djIndex === -1) {
      return res.status(404).json({ message: "DJ not found" });
    }

    // Update DJ with incoming fields (shallow merge)
    djs[djIndex] = { ...djs[djIndex], ...updates };

    // Save back to file
    fs.writeFileSync(djsPath, JSON.stringify(djs, null, 2));

    // Respond with updated DJ
    res.json(djs[djIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating DJ" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});