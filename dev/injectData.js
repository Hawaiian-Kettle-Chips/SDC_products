// npm run seed

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const fastcsv = require('fast-csv');


const pool = new Pool({ max: 100 });

const tables = ['products', 'features', 'styles', 'photos', 'skus', 'relations'];
// tables.forEach(()=> {   all that jazz   });
const tableName = 'products';
let rowCount = 0;
pool.connect(function (dbError, client, done) {
  if (dbError) { throw dbError; }

  var fileStream = fs.createReadStream(path.join(__dirname, `/raw_data/${tableName}.csv`));
  fileStream.on('error', (error) => { done(); throw error; });


  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      csvData.push(data); // push each line as an array of strings
    })
    .on('end', () => {
      const header = csvData.shift(); // skip the header on the first line

      csvData.forEach((row) => {
        const nPlaceholders = Array.from({ length: row.length }, (__, i) => `$${i + 1}`);
        const query = `INSERT INTO ${tableName} (${header.map((i) => `"${i}"`)}) VALUES (${nPlaceholders})`;

        client.query(query, row, (error) => {
          if (error) { console.error('QUERY:', query); throw error; }
          ++rowCount;
        });
      })

      console.info(csvData[csvData.length - 1]);
      console.info('FINISHED IMPORT FOR', tableName, 'WITH', rowCount, 'ROWS');
      done();
    });
  fileStream.pipe(csvStream);
});
