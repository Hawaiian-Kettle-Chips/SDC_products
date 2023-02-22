const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.clear();
  console.info('=== INIT SERVER CLUSTER', '='.repeat(42))
  console.info(`LOCAL BALANCER: Forking for ${cpus} CPUs`);
  console.info('                Scheduling Policy is', cluster.schedulingPolicy === 2 ? 'Round Robin' : 'SCHED_NONE');
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  require('./server.js');
}
