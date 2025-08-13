// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const morgan = require("morgan");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 8002;

// ---------------------- infra & helpers ----------------------
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

const root = __dirname;
const uploadsRoot = path.join(root, "uploads");
const dataDir     = path.join(root, "data");

for (const p of [uploadsRoot, dataDir]) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

const djsPath     = path.join(dataDir, "djs.json");
const mixesPath   = path.join(dataDir, "mixes.json");
const eventsPath  = path.join(dataDir, "events.json");
const galleryPath = path.join(dataDir, "gallery.json");

for (const p of [djsPath, mixesPath, eventsPath, galleryPath]) {
  if (!fs.existsSync(p)) fs.writeFileSync(p, "[]");
}

// serve uploads
app.use("/uploads", express.static(uploadsRoot));

// JSON file helpers
const readJson  = (p) => JSON.parse(fs.readFileSync(p, "utf-8"));
const writeJson = (p, data) => fs.writeFileSync(p, JSON.stringify(data, null, 2));

// create subdirs + multers
function mkStore(subdir) {
  const dir = path.join(uploadsRoot, subdir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return multer({ dest: dir });
}
const upDJ      = mkStore("djs");      // .single("image")
const upEvent   = mkStore("events");   // .single("image")
const upMix     = mkStore("mixes");    // .fields([{name:"audio"},{name:"image"}])
const upGallery = mkStore("gallery");  // .single("image")

// util: absolute URL for a relative /uploads path
const fileUrl = (req, relPath) => `${req.protocol}://${req.get("host")}${relPath}`;

// -------------------------------------------------------------
// health
app.get("/", (_req, res) => res.send("Ouro Node backend is running."));

// -------------------------------------------------------------
// DJs
// GET list
app.get("/api/elements/djs/", (req, res) => {
  try {
    const out = readJson(djsPath);
    res.json(out);
  } catch (e) {
    console.error("[djs list] error:", e);
    res.status(500).json({ message: "Error reading DJs" });
  }
});

// POST multipart
app.post("/api/elements/djs/", upDJ.single("image"), (req, res) => {
  try {
    console.log("---- /djs/ POST ----");
    console.log("[ctype]", req.headers["content-type"]);
    console.log("[file ]", req.file && { fieldname: req.file.fieldname, originalname: req.file.originalname, size: req.file.size, path: req.file.path });
    console.log("[body ]", req.body);

    const { artist, description, socialmedia } = req.body; // frontend uses 'socialmedia'
    if (!artist || !description) {
      return res.status(400).json({ message: "artist and description are required" });
    }

    const djs = readJson(djsPath);
    const newId = (djs.reduce((m, x) => Math.max(m, x.id || 0), 0) || 0) + 1;

    const imageRel = req.file ? `/uploads/djs/${req.file.filename}` : null;

    const newDJ = {
      id: newId,
      artist,
      description,
      socialMedia: socialmedia || "",
      image: imageRel, // your frontend reads dj.image
      isSelected: false,
      isSpotlight: false,
    };

    djs.push(newDJ);
    writeJson(djsPath, djs);
    res.status(201).json(newDJ);
  } catch (e) {
    console.error("[djs post] error:", e);
    res.status(500).json({ message: "Error saving DJ" });
  }
});

// PATCH by id
app.patch("/api/elements/djs/:id/", (req, res) => {
  try {
    const id = String(req.params.id);
    const djs = readJson(djsPath);
    const i = djs.findIndex((x) => String(x.id) === id);
    if (i === -1) return res.status(404).json({ message: "DJ not found" });
    djs[i] = { ...djs[i], ...req.body };
    writeJson(djsPath, djs);
    res.json(djs[i]);
  } catch (e) {
    console.error("[djs patch] error:", e);
    res.status(500).json({ message: "Error updating DJ" });
  }
});

// DELETE by id
app.delete("/api/elements/djs/:id/", (req, res) => {
  try {
    const id = String(req.params.id);
    const djs = readJson(djsPath);
    const n = djs.filter((x) => String(x.id) !== id);
    if (n.length === djs.length) return res.status(404).json({ message: "DJ not found" });
    writeJson(djsPath, n);
    res.status(204).end();
  } catch (e) {
    console.error("[djs del] error:", e);
    res.status(500).json({ message: "Error deleting DJ" });
  }
});

// -------------------------------------------------------------
// Events
// GET list
app.get("/api/elements/events/", (req, res) => {
  try {
    const evts = readJson(eventsPath);
    res.json(evts);
  } catch (e) {
    console.error("[events list] error:", e);
    res.status(500).json({ message: "Error reading events" });
  }
});

// POST multipart
app.post("/api/elements/events/", upEvent.single("image"), (req, res) => {
  try {
    console.log("---- /events/ POST ----");
    console.log("[ctype]", req.headers["content-type"]);
    console.log("[file ]", req.file && { fieldname: req.file.fieldname, originalname: req.file.originalname, size: req.file.size, path: req.file.path });
    console.log("[body ]", req.body);

    const { title, date, location, description, rsvp_link, artists } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: "title and date are required" });
    }

    let artistsArray = [];
    if (artists) {
      try { artistsArray = JSON.parse(artists); }
      catch { return res.status(400).json({ message: "invalid artists JSON" }); }
    }

    const events = readJson(eventsPath);
    const newId = (events.reduce((m, x) => Math.max(m, x.id || 0), 0) || 0) + 1;

    const imageRel = req.file ? `/uploads/events/${req.file.filename}` : null;

    const newEvent = {
      id: newId,
      title,
      date, // YYYY-MM-DD from frontend
      location: location || "",
      description: description || "",
      rsvp_link: rsvp_link || "",
      artists: artistsArray, // [{name,time}]
      image: imageRel,
      isSelected: false,
      isUpcoming: false,
      isLatest: false,
    };

    events.push(newEvent);
    writeJson(eventsPath, events);
    res.status(201).json(newEvent);
  } catch (e) {
    console.error("[events post] error:", e);
    res.status(500).json({ message: "Error creating event" });
  }
});

// PATCH by id
app.patch("/api/elements/events/:id/", (req, res) => {
  try {
    const id = String(req.params.id);
    const events = readJson(eventsPath);
    const i = events.findIndex((x) => String(x.id) === id);
    if (i === -1) return res.status(404).json({ message: "Event not found" });
    events[i] = { ...events[i], ...req.body };
    writeJson(eventsPath, events);
    res.json(events[i]);
  } catch (e) {
    console.error("[events patch] error:", e);
    res.status(500).json({ message: "Error updating event" });
  }
});

// DELETE by id
app.delete("/api/elements/events/:id/", (req, res) => {
  try {
    const id = String(req.params.id);
    const events = readJson(eventsPath);
    const n = events.filter((x) => String(x.id) !== id);
    if (n.length === events.length) return res.status(404).json({ message: "Event not found" });
    writeJson(eventsPath, n);
    res.status(204).end();
  } catch (e) {
    console.error("[events del] error:", e);
    res.status(500).json({ message: "Error deleting event" });
  }
});

// -------------------------------------------------------------
// Mixes
// GET list
app.get("/api/elements/mixes/", (req, res) => {
  try {
    const mixes = readJson(mixesPath);
    res.json(mixes);
  } catch (e) {
    console.error("[mixes list] error:", e);
    res.status(500).json({ message: "Error reading mixes" });
  }
});

// POST multipart (audio + optional image)
app.post(
  "/api/elements/mixes/",
  upMix.fields([{ name: "audio", maxCount: 1 }, { name: "image", maxCount: 1 }]),
  (req, res) => {
    try {
      console.log("---- /mixes/ POST ----");
      console.log("[ctype]", req.headers["content-type"]);
      console.log("[files]", Object.fromEntries(Object.entries(req.files || {}).map(([k, arr]) => [k, arr.map(f => ({ orig: f.originalname, size: f.size, path: f.path }))])));
      console.log("[body ]", req.body);

      const { title, artist, description } = req.body;
      if (!title || !artist) {
        return res.status(400).json({ message: "title and artist are required" });
      }

      const audio = req.files?.audio?.[0];
      if (!audio) return res.status(400).json({ message: "audio file is required" });

      const img = req.files?.image?.[0];

      const mixes = readJson(mixesPath);
      const newId = (mixes.reduce((m, x) => Math.max(m, x.id || 0), 0) || 0) + 1;

      const newMix = {
        id: newId,
        title,
        artist,
        description: description || "",
        audio: `/uploads/mixes/${audio.filename}`,
        image: img ? `/uploads/mixes/${img.filename}` : null,
        isSelected: false,
        isLatest: false,
      };

      mixes.push(newMix);
      writeJson(mixesPath, mixes);
      res.status(201).json(newMix);
    } catch (e) {
      console.error("[mixes post] error:", e);
      res.status(500).json({ message: "Error creating mix" });
    }
  }
);

// PATCH by id
app.patch("/api/elements/mixes/:id/", (req, res) => {
  try {
    const id = String(req.params.id);
    const mixes = readJson(mixesPath);
    const i = mixes.findIndex((x) => String(x.id) === id);
    if (i === -1) return res.status(404).json({ message: "Mix not found" });
    mixes[i] = { ...mixes[i], ...req.body };
    writeJson(mixesPath, mixes);
    res.json(mixes[i]);
  } catch (e) {
    console.error("[mixes patch] error:", e);
    res.status(500).json({ message: "Error updating mix" });
  }
});

// DELETE by id
app.delete("/api/elements/mixes/:id/", (req, res) => {
  try {
    const id = String(req.params.id);
    const mixes = readJson(mixesPath);
    const n = mixes.filter((x) => String(x.id) !== id);
    if (n.length === mixes.length) return res.status(404).json({ message: "Mix not found" });
    writeJson(mixesPath, n);
    res.status(204).end();
  } catch (e) {
    console.error("[mixes del] error:", e);
    res.status(500).json({ message: "Error deleting mix" });
  }
});

// -------------------------------------------------------------
// Gallery
// GET list
app.get("/api/elements/gallery/", (req, res) => {
  try {
    const gallery = readJson(galleryPath);
    res.json(gallery);
  } catch (e) {
    console.error("[gallery list] error:", e);
    res.status(500).json({ message: "Error reading gallery" });
  }
});

// POST multipart (one image per request)
app.post("/api/elements/gallery/", upGallery.single("image"), (req, res) => {
  try {
    console.log("---- /gallery/ POST ----");
    console.log("[ctype]", req.headers["content-type"]);
    console.log("[file ]", req.file && { originalname: req.file.originalname, size: req.file.size, path: req.file.path });

    if (!req.file) return res.status(400).json({ message: "image is required" });

    const items = readJson(galleryPath);
    const newId = (items.reduce((m, x) => Math.max(m, x.id || 0), 0) || 0) + 1;

    const newImg = {
      id: newId,
      image: `/uploads/gallery/${req.file.filename}`,
      isSelected: false,
    };

    items.push(newImg);
    writeJson(galleryPath, items);
    res.status(201).json(newImg);
  } catch (e) {
    console.error("[gallery post] error:", e);
    res.status(500).json({ message: "Error saving image" });
  }
});

// PATCH by id
app.patch("/api/elements/gallery/:id/", (req, res) => {
  try {
    const id = String(req.params.id);
    const items = readJson(galleryPath);
    const i = items.findIndex((x) => String(x.id) === id);
    if (i === -1) return res.status(404).json({ message: "Image not found" });
    items[i] = { ...items[i], ...req.body };
    writeJson(galleryPath, items);
    res.json(items[i]);
  } catch (e) {
    console.error("[gallery patch] error:", e);
    res.status(500).json({ message: "Error updating image" });
  }
});

// DELETE by id
app.delete("/api/elements/gallery/:id/", (req, res) => {
  try {
    const id = String(req.params.id);
    const items = readJson(galleryPath);
    const n = items.filter((x) => String(x.id) !== id);
    if (n.length === items.length) return res.status(404).json({ message: "Image not found" });
    writeJson(galleryPath, n);
    res.status(204).end();
  } catch (e) {
    console.error("[gallery del] error:", e);
    res.status(500).json({ message: "Error deleting image" });
  }
});

// -------------------------------------------------------------
// Contact (email) — unchanged
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_TO || "parkerjeanneallen@gmail.com",
      subject: `New message from ${name} (ouro)`,
      text: `You got a new message from ${name} (${email}):\n\n${message}`,
    });
    res.json({ message: "Message sent successfully!" });
  } catch (e) {
    console.error("[contact] error:", e);
    res.status(500).json({ message: "Error sending message" });
  }
});

// -------------------------------------------------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on http://0.0.0.0:${PORT}`);
});