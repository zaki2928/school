const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/teachers
router.get("/", (req, res) => {
  db.query("SELECT * FROM teachers ORDER BY name", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
