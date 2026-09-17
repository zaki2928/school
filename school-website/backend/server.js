// =====================================================
// MAIN SERVER
// Browser/React  -->  Express API  -->  MySQL
// =====================================================
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // allow React (localhost:5173) to call API
app.use(express.json()); // read JSON body from frontend

// Routes (each file = one feature)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/teachers", require("./routes/teachers"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/notices", require("./routes/notices"));
app.use("/api/events", require("./routes/events"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/contact", require("./routes/contact"));

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "School API is running ✅",
    endpoints: [
      "POST /api/auth/login",
      "POST /api/auth/register",
      "GET  /api/teachers",
      "GET  /api/courses",
      "GET  /api/notes",
      "POST /api/notes",
      "GET  /api/notices",
      "GET  /api/events",
      "GET  /api/gallery",
      "POST /api/contact",
    ],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
