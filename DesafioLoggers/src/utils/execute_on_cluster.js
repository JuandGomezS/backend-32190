import { startServer } from "../../app.js";
import { getSystemInfo } from "./getSysteminfo.js";
import cluster from 'cluster';
import { warnLogger, debugLogger } from "./logger.js";

export function executeServerCluster(port) {
    if (cluster.isPrimary) {
        debugLogger.info("Executing app in cluster mode");
        const cpus = getSystemInfo().processors;

        // Forking to workers
        for (let i = 0; i < cpus; i++) cluster.fork();

        cluster.on("exit", (worker) => {
            warnLogger.warn(`Worker ${worker.process.pid} died`);
            cluster.fork();
        });

        cluster.on("listening", (worker) => {
            debugLogger.info(`New Worker ${worker.process.pid} is alive and listening`)
        });
    } else {
        startServer(port)
    }
}