const db = require("../db/connection");

exports.selectSnacksById = (id) => {
  return db
    .query(`SELECT * FROM snacks WHERE snack_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows[0];
    });
};

exports.insertSnack = (snack_name, price, snack_description, category_id) => {
  return db
    .query(
      `INSERT into snacks (snack_name, snack_description, category_id) VALUES ($1, $2, $3) RETURNING *;`,
      [snack_name, snack_description, category_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
