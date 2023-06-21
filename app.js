const express = require("express");
const { getApi } = require("./controllers/api.controllers");
const { getSnacksById } = require("./controllers/snacks.controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/errors");

const app = express();

app.get("/api", getApi);

app.get("/api/snacks/:id", getSnacksById);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
