require('dotenv').config()
const express = require('express');
const load_balancer = express();
const axios = require('axios')

const servers = require('./servers');


// naive round robin approach
let current_server = 0;

const requestHandler = async function (request, response) {
  const { method, url, headers, body } = request;
  const server = servers[current_server];

  (current_server === servers.length - 1) ? current_server = 0 : current_server += 1;

  try {
    const server_response = await axios(`http://${server}${url}`, {
      method: method,
      headers: headers,
      data: body,
    });

    response.status(200)
    response.send(server_response.data);
  }
  catch (error) {
    if (error.response?.status) {
      console.info(error.response.status);
      response.status(404).send(error.response.data)
    }
    else {
      console.info('500', error.code);
      response.status(500).send(error);
    }

  }
}

load_balancer.use('/favicon.ico', express.static('./images/favicon.ico'));
load_balancer.use((request, response) => { requestHandler(request, response); });
load_balancer.listen(process.env.LB_PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.clear();
    console.info('LOAD BALANCER: Process ID is', process.pid);
    console.info(`               Listening at http://${process.env.LB_URL}:${process.env.LB_PORT}`);
    console.info('               Servers are', servers);
  }
});
