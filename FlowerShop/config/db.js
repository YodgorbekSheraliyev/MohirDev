const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  database: "flowershop",
  password: '5481',
  host: 'localhost',
  port: 5400,
});

pool.once("connection", () => {
  pool.query("create table if not exists user_session (sid varchar primary key, sess json, expire timestamp")
})

module.exports = pool