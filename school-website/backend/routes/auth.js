// Auth routes: login + register
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST /api/auth/register
router.post("/register", (req, res) => {
  const { name, email, password, class_name } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password required" });
  }

  const sql =
    "INSERT INTO users (name, email, password, role, class_name) VALUES (?, ?, ?, 'student', ?)";

  db.query(sql, [name, email, password, class_name || null], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already registered" });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Registered successfully",
      user: { id: result.insertId, name, email, role: "student", class_name },
    });
  });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT id, name, email, role, class_name FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      res.json({ message: "Login success", user: rows[0] });
    }
  );
});

module.exports = router;
