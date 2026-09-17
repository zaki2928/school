const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST /api/contact  — save contact form messages
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  db.query(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Message sent successfully! We will reply soon." });
    }
  );
});

module.exports = router;
