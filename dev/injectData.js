// npm run seed

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const fastcsv = require('fast-csv');


const pool = new Pool({ max: 100, idleTimeoutMillis: 0, connectionTimeoutMillis: 0 });

const tables = ['products', 'relations', 'features', 'styles', 'photos', 'skus'];

let tableName = 'products';
pool.connect(function (dbError) {
  if (dbError) { throw dbError; }

  const file = path.join(__dirname, `/raw_data/${tableName}.csv`);
  const fileStream = fs.createReadStream(file);
  fileStream.on('error', (error) => {
    pool.end(); throw error;
  });
  fileStream.on('close', () => {
    console.info('closed file stream');
  });

  let header;
  const csvStream = fastcsv
    .parse({ headers: true })
    .on('headers', (head) => {
      console.info('IMPORTING', tableName, head);
      header = head;
    })
    .on('data', (rowData) => {

      // if we wanted to sanitize data, this is where we would do that
      let rowValues = [];
      for (let key in rowData) {
        rowValues.push(rowData[key]);
      }

      const nPlaceholders = Array.from({ length: rowValues.length }, (__, i) => `$${i + 1}`);
      const query = `INSERT INTO ${tableName} (${header.map((i) => `"${i}"`)}) VALUES (${nPlaceholders})`;

      pool.query(query, rowValues, (error) => {
        if (error) {
          console.error('QUERY:', query);
          throw error;
        }
        process.stdout.write('CURRENT POOL QUEUE: ' + pool._pendingQueue.length + '\r');
      });
    })
    .on('end', () => {
      console.info('- FINISHED READING', file);
    });

  fileStream.pipe(csvStream);
});
