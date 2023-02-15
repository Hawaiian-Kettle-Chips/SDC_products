// IMPORTS
const models = require('../models');


function genericResponse(request, response) {
  response.status(200);
  response.send('The Server Is On');
}

function return404Page(request, response) {
  console.log('returning 404 page');
  response.status(404);
  response.send('<center><h1>🦖<p>His weak tiny arms<p>ineffective in their reach<p>gift you [404]</h1></center>');
}


module.exports = {
  return404: return404Page,
  default: genericResponse
};
