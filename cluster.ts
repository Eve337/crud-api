import cluster from "node:cluster";
import os from 'os';
import process from "node:process";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
     cluster.fork();
  });
} 
  
if (cluster.isWorker) {  
  import('./index');  
}