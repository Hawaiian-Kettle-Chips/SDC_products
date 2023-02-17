// npm run seed

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const fastcsv = require('fast-csv');


const pool = new Pool({ max: 200, idleTimeoutMillis: 0, connectionTimeoutMillis: 0 });

const tables = ['products', 'relations', 'features', 'styles', 'photos', 'skus'];

let tableName = 'relations';
pool.connect(function (dbError) {
  if (dbError) {
    console.error('POOL CONNECT ERROR');
    throw dbError;
  }

  const file = path.join(__dirname, `/raw_data/${tableName}.csv`);
  const fileStream = fs.createReadStream(file);
  fileStream.on('error', (error) => {
    pool.end();
    console.error('FILESTREAM ERROR')
    throw error;
  });
  fileStream.on('close', () => {
    console.info('closed file stream');
  });

  let header;
  const quoteValue = tableName === 'photos' ? null : '"';
  const csvStream = fastcsv
    .parse({ headers: true, quote: quoteValue })
    .on('headers', (head) => {
      console.info('IMPORTING', tableName, head);
      header = head;
    })
    .on('data', (rowData) => {
      // if we wanted to sanitize data, this is where we would do that
      let rowValues = [];
      for (let key in rowData) {
        if (rowData[key] === 'null') { rowData[key] = null; }
        rowValues.push(rowData[key]);
      }

      const nPlaceholders = Array.from({ length: rowValues.length }, (__, i) => `$${i + 1}`);
      const query = `INSERT INTO ${tableName} (${header.map((i) => `"${i}"`)}) VALUES (${nPlaceholders}) ON CONFLICT DO NOTHING`;

      pool.query(query, rowValues, (error) => {
        if (error) {
          console.error('POOL ERROR FOR QUERY:', query, '\nVALUES:', rowValues);
          throw error;
        }
        if (pool._pendingQueue.length % 9 === 0) {
          process.stdout.write('CURRENT POOL QUEUE: ' + pool._pendingQueue.length + '          \r');
        }
      });
    })
    .on('error', (error) => {
      console.error('CSV STREAM ERROR')
      throw error;
    })
    .on('end', () => {
      console.info('FINISHED READING', file);
    });

  fileStream.pipe(csvStream);
});
