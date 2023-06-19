const db = require("./connection.js");
const format = require("pg-format");
const { createLookup } = require("./utils/utils.js");

function seed({ categoriesData, snacksData, drinksData }) {
  return db
    .query(`DROP TABLE IF EXISTS drinks;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS snacks;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE categories(
              category_id SERIAL PRIMARY KEY,
              category_name VARCHAR);`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE snacks(
        snack_id SERIAL PRIMARY KEY,
        snack_name VARCHAR,
        snack_description TEXT,
        category_id INT REFERENCES categories(category_id));`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE drinks(
            drink_id SERIAL PRIMARY KEY,
            drink_name VARCHAR,
            drink_description TEXT,
            category_id INT REFERENCES categories(category_id));`
      );
    })
    .then(() => {
      const dataToInsert = categoriesData.map(({ category_name }) => [
        category_name,
      ]);
      return db.query(
        format(
          `INSERT INTO categories (category_name) VALUES %L RETURNING *;`,
          dataToInsert
        )
      );
    })
    .then(({ rows }) => {
      const lookup = createLookup(rows, "category_name", "category_id");
      const dataToInsert = snacksData.map(
        ({ snack_name, snack_description, category }) => {
          return [snack_name, snack_description, lookup[category]];
        }
      );
      const queryString = format(
        `INSERT INTO snacks (snack_name, snack_description, category_id) VALUES %L RETURNING *;`,
        dataToInsert
      );
      return Promise.all([lookup, db.query(queryString)]);
    })
    .then(([lookup]) => {
      const dataToInsert = drinksData.map(
        ({ drink_name, drink_description, category }) => {
          return [drink_name, drink_description, lookup[category]];
        }
      );
      const queryString = format(
        `INSERT INTO drinks (drink_name, drink_description, category_id) VALUES %L RETURNING *;`,
        dataToInsert
      );
      return db.query(queryString);
    });

  // - drinks
}

module.exports = seed;
