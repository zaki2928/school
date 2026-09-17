// =====================================================
// DEMO SERVER — works WITHOUT MySQL
// Same endpoints as server.js so React needs no changes
//
 // Later switch:
 //   npm start        → MySQL version (server.js)
 //   npm run demo     → this file
 // =====================================================
const express = require("express");
const cors = require("cors");
const store = require("./demoStore");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "School API running in DEMO mode (no MySQL) ✅",
    tip: "Install XAMPP MySQL later, run schema.sql, then use: npm start",
  });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password, class_name } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password required" });
  }
  if (store.findUserByEmail(email)) {
    return res.status(400).json({ error: "Email already registered" });
  }
  const user = store.addUser({ name, email, password, class_name: class_name || null });
  res.json({
    message: "Registered successfully",
    user: { id: user.id, name: user.name, email: user.email, role: user.role, class_name: user.class_name },
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = store.findUser(email, password);
  if (!user) return res.status(401).json({ error: "Invalid email or password" });
  res.json({
    message: "Login success",
    user: { id: user.id, name: user.name, email: user.email, role: user.role, class_name: user.class_name },
  });
});

app.get("/api/teachers", (req, res) => res.json(store.teachers));
app.get("/api/courses", (req, res) => res.json(store.courses));
app.get("/api/notices", (req, res) => res.json(store.notices));
app.get("/api/events", (req, res) => res.json(store.events));
app.get("/api/gallery", (req, res) => res.json(store.gallery));

app.get("/api/notes", (req, res) => {
  let rows = store.getNotes();
  if (req.query.subject) {
    rows = rows.filter((n) => n.subject === req.query.subject);
  }
  res.json(rows);
});

app.get("/api/notes/:id", (req, res) => {
  const note = store.getNote(req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

app.post("/api/notes", (req, res) => {
  const { title, subject, class_name, content, uploaded_by } = req.body;
  if (!title || !subject || !content) {
    return res.status(400).json({ error: "title, subject, content required" });
  }
  const note = store.addNote({ title, subject, class_name, content, uploaded_by });
  res.json({ message: "Note added", id: note.id });
});

app.delete("/api/notes/:id", (req, res) => {
  store.deleteNote(req.params.id);
  res.json({ message: "Note deleted" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }
  store.addContact({ name, email, message });
  res.json({ message: "Message sent successfully! We will reply soon." });
});

app.listen(PORT, () => {
  console.log(`🚀 DEMO server at http://localhost:${PORT}`);
  console.log("   (No MySQL needed — using in-memory data)");
});
