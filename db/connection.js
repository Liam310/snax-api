// build a pool of clients (or connections) to interface our database.
const { Pool } = require("pg");

// test         "test"
// not-test     undefined

const ENV = process.env.NODE_ENV || "development";
const pathToEnvFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({ path: pathToEnvFile });


if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE HAS NOT BEEN SET!!!");
}

console.log(`the node environment is ${ENV}`);
console.log(`the path is ${pathToEnvFile}`);
console.log(`the database is ${process.env.PGDATABASE}`);

const pool = new Pool();

module.exports = pool;
