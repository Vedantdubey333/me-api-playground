const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database("./db.sqlite");

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    skills TEXT
  )
`);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Save profile
app.post("/profile", (req, res) => {
  const { name, email, skills } = req.body;
  db.run(
    "INSERT INTO profile (name, email, skills) VALUES (?, ?, ?)",
    [name, email, skills],
    () => res.json({ message: "Profile saved" })
  );
});

// Get profile
app.get("/profile", (req, res) => {
  db.all("SELECT * FROM profile", (err, rows) => {
    res.json(rows);
  });
});

// Search by skill
app.get("/skills/top", (req, res) => {
  const skill = req.query.skill;
  db.all(
    "SELECT * FROM profile WHERE skills LIKE ?",
    [`%${skill}%`],
    (err, rows) => res.json(rows)
  );
});

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
