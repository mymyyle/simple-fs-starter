const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");

const indexRouter = require("./routes/index");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", indexRouter);

app.use("/", async (req, res) => {
  return res.sendFile(path.join(__dirname, "index.html"));
});

app.use((req, res, next) => {
  const error = new Error("Path not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log("ERROR", error.message);
  if (!error.status) {
    error.status = 500;
  }
  return res.status(error.status).send(error.message);
});

module.exports = app;
