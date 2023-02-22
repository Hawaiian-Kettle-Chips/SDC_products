// System level testing suite: https://k6.io/
// k6 cloud local_stress_test.js
import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// This value changes per run of `lt`
const server_ip = 'http://localhost:3001';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    stress: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 4000,
      timeUnit: "1s",
      stages: [
        { duration: "30s", target: 100 }, // normal load
        { duration: "1m", target: 2000 }, // the breaking point
        { duration: "1m", target: 4000 }, // ... and beyond!
        { duration: "30s", target: 1000 },
        { duration: "30s", target: 100 }, // scale down. Recovery stage.
        { duration: "1m", target: 0 },
      ],
    },
    spike: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 10000,
      timeUnit: "1s",
      startTime: '5m',
      stages: [
        { duration: "30s", target: 100 }, // normal load
        { duration: "30s", target: 3000 }, // spike
        { duration: "30s", target: 3000 },
        { duration: "30s", target: 10 }, // scale down. Recovery stage.
        { duration: "10s", target: 0 },
      ],
      gracefulStop: "1m",
    },
  },
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function handleSummary(data) {
  return {
    "stress-result.html": htmlReport(data),
    'stress-summary.json': JSON.stringify(data),
  };
}

export default function () {
  let randomID = String(getRandomIntInclusive(1, 1000011));
  http.get(server_ip + '/products/' + randomID);
  http.get(server_ip + '/products/' + randomID + '/styles');
  http.get(server_ip + '/products/' + randomID + '/related');
  sleep(1)
}
