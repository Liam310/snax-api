const express = require("express");
const { getApi } = require("./controllers/api.controllers");
const {
  getSnacksById,
  postSnack,
  getAllSnacks,
} = require("./controllers/snacks.controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/errors");

const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/snacks/:id", getSnacksById);

app.get("/api/snacks", getAllSnacks);

app.post("/api/snacks", postSnack);

app.all("*", (_, res) => {
  res.status(404).send({  msg: "Not found" });
});

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
