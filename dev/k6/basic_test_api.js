// System level testing suite: https://k6.io/
// Globall installed LocalTunnel: https://github.com/localtunnel/localtunnel
// $ lt --port 3001
// set localTunnelIp
// k6 cloud basic_test_api.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// This value changes per run of `lt`
const localTunnelIp = 'https://real-seals-taste-23-93-186-191.loca.lt/testDB';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '30s', target: 10 },
  ],
};

export default function () {
  const res = http.get(localTunnelIp);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
