// build a pool of clients (or connections) to interface our database.
const { Pool } = require('pg');

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE HAS NOT BEEN SET!!!');
}

const pool = new Pool();

module.exports = pool;
