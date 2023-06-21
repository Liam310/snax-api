const db = require("../db/connection");

exports.selectSnacksById = (id) => {
  return db
    .query(`SELECT * FROM snacks WHERE snack_id = $1`, [id])
    .then(({ rows }) => { // destructuring rows
      console.log(rows);
      return rows[0]; // only want to send back one thing
    });
};

// sql injection

// /api/snacks/; DROP TABLE snacks;
