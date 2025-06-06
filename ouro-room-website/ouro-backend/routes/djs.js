const express = require("express");
const router = express.Router();

let djs = [
  {
    id: "ouro1",
    artist: "DJ Ouro",
    description: "Founder of the Ouro Room. House-heavy sets.",
    image: "/assets/ouro-record.png",
  },
];

// GET all DJs
router.get("/", (req, res) => {
  res.json(djs);
});

// POST a new DJ
router.post("/", (req, res) => {
  const { id, artist, description, image } = req.body;
  if (!id || !artist || !description || !image) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const newDJ = { id, artist, description, image };
  djs.push(newDJ);
  res.status(201).json(newDJ);
});

module.exports = router;