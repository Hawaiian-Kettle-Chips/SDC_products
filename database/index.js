// IMPORTS
const { Pool } = require('pg')

// Slightly more useful error messaging than default PG Node
const originalPoolQuery = Pool.prototype.query;
Pool.prototype.query = async function query(...args) {
  try {
    return await originalPoolQuery.apply(this, args);
  } catch (error) {
    console.error(error);
  }
}

const pool = new Pool({ max: 200 });

pool.connect((error) => {
  if (error) { console.error('DB:', error); }
  else { console.info(`DB:\tListening at http://${process.env.PGHOST}:${process.env.PGPORT}`); }
});

module.exports = pool;
