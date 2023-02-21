// System level testing suite: https://k6.io/
// Globall installed LocalTunnel: https://github.com/localtunnel/localtunnel
// $ lt --port 3001
// set localTunnelIp
// k6 cloud basic_test_api.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// This value changes per run of `lt`
const localTunnelIp = 'https://two-memes-fetch-23-93-186-191.loca.lt';

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

export function handleSummary(data) {
  return {
    "basic-result.html": htmlReport(data),
    'basic-summary.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: "║", enableColors: true }),
  };
}

export default function () {
  let randomID = String(getRandomIntInclusive(1, 1000011));
  const res = http.get(localTunnelIp + '/products/' + randomID);
  // local checks are CPU expensive, potentially a +40% cost!
  // check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
