// =====================================================
// DATABASE CONNECTION
// Flow: server.js --> config/db.js --> MySQL
// =====================================================
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "school_db",
  waitForConnections: true,
  connectionLimit: 10,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    console.error("   → Check XAMPP/MySQL is running");
    console.error("   → Check .env DB_PASSWORD");
    console.error("   → Did you run database/schema.sql ?");
  } else {
    console.log("✅ MySQL connected to", process.env.DB_NAME || "school_db");
    connection.release();
  }
});

module.exports = db;
