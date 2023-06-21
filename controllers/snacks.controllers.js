const { selectSnacksById } = require("../models/snacks.models");

exports.getSnacksById = (req, res, next) => {
  const { id } = req.params;
  selectSnacksById(id)
    .then((snack) => {
      res.status(200).send({ snack });
    })
    .catch(next);
};
