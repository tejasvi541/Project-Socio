const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");

// Loading Env Vars
dotenv.config({ path: "./config/config.env" });

// Initialising Express Constructor
const app = express();

// Body Parser
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handel unhandelled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  // Close Server & Exit process
  server.close(() => process.exit(1));
});
