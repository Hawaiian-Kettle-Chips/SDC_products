// System level testing suite: https://k6.io/
// Globall installed LocalTunnel: https://github.com/localtunnel/localtunnel
// $ lt --port 3001
// set localTunnelIp
// k6 cloud basic_test_api.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// This value changes per run of `lt`
const localTunnelIp = 'https://rich-pants-deny-23-93-186-191.loca.lt/products/';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '30s', target: 10 },
  ],
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function () {
  let randomID = String(getRandomIntInclusive(1, 1000011));
  const res = http.get(localTunnelIp+randomID);
  // check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
