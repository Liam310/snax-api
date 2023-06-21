const { selectSnacksById, insertSnack } = require("../models/snacks.models");

exports.getSnacksById = (req, res, next) => {
  const { id } = req.params;
  selectSnacksById(id)
    .then((snack) => {
      res.status(200).send({ snack });
    })
    .catch(next);
};

exports.postSnack = (req, res) => {
  const { snack_name, price, snack_description, category_id } = req.body;
  insertSnack(snack_name, price, snack_description, category_id).then(
    (snack) => {
      res.status(201).send({ snack });
    }
  );
};
