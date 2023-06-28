const { checkCategoryExists } = require("../models/categories.models");
const {
  selectSnacksById,
  insertSnack,
  selectAllSnacks,
} = require("../models/snacks.models");

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

exports.getAllSnacks = (req, res, next) => {
  const { category_id, sort_by } = req.query;

  const promises = [selectAllSnacks(category_id, sort_by)];

  if (category_id) {
    promises.push(checkCategoryExists(category_id));
  }

  Promise.all(promises)
    .then((resolvedPromises) => {
      const snacks = resolvedPromises[0];
      res.status(200).send({ snacks });
    })
    .catch(next);
};
