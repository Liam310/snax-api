const express = require("express");
const { getApi } = require("./controllers/api.controllers");
const {
  getSnacksById,
  postSnack,
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

app.post("/api/snacks", postSnack);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

// app.listen(9090, () => {
//   console.log(`app is listening on port 9090`);
// });

module.exports = app;
