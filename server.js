const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// simple test route
app.get("/", (req, res) => {
  res.send("App is running");
});

// health check (Railway uses this internally)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// IMPORTANT: dynamic port + correct host
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
