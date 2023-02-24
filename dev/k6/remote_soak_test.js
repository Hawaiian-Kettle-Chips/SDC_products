// System level testing suite: https://k6.io/
// k6 cloud local_stress_test.js
import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


// This value changes per run of `lt`
const server_ip = 'http://3.101.115.152:3999';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    soak: {
      executor: 'constant-vus',
      vus: 1500,
      duration: '5m',
    },
  },
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function handleSummary(data) {
  return {
    "stress-result.html": htmlReport(data),
    stdout: textSummary(data, { indent: "║", enableColors: true })
  };
}

export default function () {
  let randomID = String(getRandomIntInclusive(100001, 1000011));
  http.get(server_ip + '/products/' + randomID);
  sleep(1)
}
