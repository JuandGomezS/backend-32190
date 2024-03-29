import { startServer } from "../../app.js";
import { getSystemInfo } from "./getSysteminfo.js";
import cluster from 'cluster'

export function executeServerCluster(port) {
    if (cluster.isPrimary) {
        console.log("Executing app in cluster mode\n");
        const cpus = getSystemInfo().processors;

        // Forking to workers
        for (let i = 0; i < cpus; i++) cluster.fork();

        cluster.on("exit", (worker) => {
            console.log(`Worker ${worker.process.pid} died Reliving ... \n`);
            cluster.fork();
        });

        cluster.on("listening", (worker) => {
            console.log(
                `New Worker ${worker.process.pid} is alive and listening (^_^)\n`
            );
        });
    } else {
        startServer(port)
    }
}