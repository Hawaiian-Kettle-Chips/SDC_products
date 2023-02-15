// IMPORTS
const { Client } = require('pg')
const client = new Client()
client.connect((error) => {
  if (error) { console.error('DB:', error); }
  else { console.info(`DB:\tListening at http://${client.host}:${client.port}`); }
});

module.exports = client;
