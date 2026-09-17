const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/notes  ?subject=Math  (optional filter)
router.get("/", (req, res) => {
  const { subject } = req.query;
  let sql = "SELECT * FROM notes";
  const params = [];

  if (subject) {
    sql += " WHERE subject = ?";
    params.push(subject);
  }
  sql += " ORDER BY created_at DESC";

  db.query(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/notes/:id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM notes WHERE id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: "Note not found" });
    res.json(rows[0]);
  });
});

// POST /api/notes  (admin / teacher upload)
router.post("/", (req, res) => {
  const { title, subject, class_name, content, uploaded_by } = req.body;

  if (!title || !subject || !content) {
    return res.status(400).json({ error: "title, subject, content required" });
  }

  const sql =
    "INSERT INTO notes (title, subject, class_name, content, uploaded_by) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [title, subject, class_name || null, content, uploaded_by || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Note added", id: result.insertId });
    }
  );
});

// DELETE /api/notes/:id
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM notes WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Note deleted" });
  });
});

module.exports = router;
