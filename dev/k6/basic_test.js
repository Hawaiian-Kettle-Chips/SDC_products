// System level testing suite: https://k6.io/
// k6 run basic_test.js
// k6 run --vus 10 --duration 30s basic_test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // vus: 100,
  // duration: '10s',
  stages: [
    { duration: '30s', target: 50 },
    { duration: '30s', target: 10 },
  ],
};

export default function () {
  // http.get('https://test.k6.io');
  // sleep(1);
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
