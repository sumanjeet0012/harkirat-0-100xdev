import express from "express";
import cluster from "cluster";
import os from "os";

const port = 3000;

if (cluster.isPrimary) {
    const totalCPUs = os.cpus().length;
    console.log(`Number of CPUs: ${totalCPUs}`);
    console.log(`Primary ${process.pid} is running`);

    // Fork workers based on CPU count
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log(`Forking a new worker`);
        cluster.fork();
    });
    
} else {
    const app = express();
    console.log(`Worker ${process.pid} started`);

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.get("/api/:n", (req : any, res : any) => {
        try {
            const n = parseInt(req.params.n);
            if (isNaN(n)) {
                return res.status(400).send("Invalid number");
            }

            const maxLimit = 50000000;
            const count = n > maxLimit ? maxLimit : n;

            res.send(`Final count is ${count} from process ${process.pid}`);
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).send("Internal Server Error");
        }
    });

    app.listen(port, () => {
        console.log(`Worker ${process.pid} listening on port ${port}`);
    });
}