// IMPORTS
const { Pool } = require('pg')
const pool = new Pool();

pool.connect((error) => {
  if (error) { console.error('DB:', error); }
  else { console.info(`DB:\tListening at http://${process.env.PGHOST}:${process.env.PGPORT}`); }
});

module.exports = pool;
