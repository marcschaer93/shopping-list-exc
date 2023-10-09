const express = require("express");
const app = express();
const morgan = require("morgan");
const itemsRoutes = require("./routes/items");
const ExpressError = require("./expressError");

// Middleware to parse json in incoming requests
app.use(express.json());

// prefix --> "/items"
app.use("/items", itemsRoutes);

//logger
app.use(morgan("dev"));

/** 404 handler */

app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  next(err);
});

/** Error handler */

app.use((err, req, res, next) => {
  let msg = err.msg;
  let status = err.status || 500;

  res.status(status).json({ error: { msg, status } });
});

module.exports = app;
