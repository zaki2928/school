const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/courses  (join teacher name)
router.get("/", (req, res) => {
  const sql = `
    SELECT c.*, t.name AS teacher_name
    FROM courses c
    LEFT JOIN teachers t ON c.teacher_id = t.id
    ORDER BY c.title
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
