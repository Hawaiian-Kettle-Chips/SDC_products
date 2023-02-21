// System level testing suite: https://k6.io/
// Globall installed LocalTunnel: https://github.com/localtunnel/localtunnel
// $ lt --port 3001
// set localTunnelIp
// k6 cloud basic_scenario_test_api.js
import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// This value changes per run of `lt`
const localTunnelIp = 'https://kind-mangos-cheat-23-93-186-191.loca.lt';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    scenario_a: {
      executor: 'constant-vus',
      exec: 'getProduct',
      vus: 50,
      duration: '30s',
      tags: { my_custom_tag: 'getProduct' }
    },
    scenario_b: {
      executor: 'ramping-vus',
      exec: 'getStyles',
      startTime: '60s',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 40 },
        { duration: '30s', target: 10 },
      ],
      gracefulRampDown: '10s',
    },
    scenario_c: {
      executor: 'constant-vus',
      exec: 'getStyles',
      vus: 50,
      duration: '30s',
      startTime: '150s'
    },
    scenario_d: {
      executor: 'ramping-vus',
      exec: 'getRelated',
      startTime: '240s',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 }
      ],
      gracefulRampDown: '10s',
    },
  },
};

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function handleSummary(data) {
  return {
    "heavy-result.html": htmlReport(data),
    'heavy-summary.json': JSON.stringify(data),
  };
}

export function getProduct() {
  let randomID = String(getRandomIntInclusive(1, 1000011));
  const res = http.get(localTunnelIp + '/products/' + randomID)
  sleep(1);
}

export function getStyles() {
  let randomID = String(getRandomIntInclusive(1, 1000011));
  const res = http.get(localTunnelIp + '/products/' + randomID + '/styles', {
    tags: { my_custom_tag: 'getStyles' }
  });
  sleep(1);
}

export function getRelated() {
  let randomID = String(getRandomIntInclusive(1, 1000011));
  const res = http.get(localTunnelIp + '/products/' + randomID + '/related', {
    tags: { my_custom_tag: 'getStyles' }
  });
  sleep(1);
}
