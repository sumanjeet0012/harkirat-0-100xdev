"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const port = 3000;
if (cluster_1.default.isPrimary) {
    const totalCPUs = os_1.default.cpus().length;
    console.log(`Number of CPUs: ${totalCPUs}`);
    console.log(`Primary ${process.pid} is running`);
    // Fork workers based on CPU count
    for (let i = 0; i < totalCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log(`Forking a new worker`);
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    console.log(`Worker ${process.pid} started`);
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.get("/api/:n", (req, res) => {
        try {
            const n = parseInt(req.params.n);
            if (isNaN(n)) {
                return res.status(400).send("Invalid number");
            }
            const maxLimit = 50000000;
            const count = n > maxLimit ? maxLimit : n;
            res.send(`Final count is ${count} from process ${process.pid}`);
        }
        catch (error) {
            console.error("Error processing request:", error);
            res.status(500).send("Internal Server Error");
        }
    });
    app.listen(port, () => {
        console.log(`Worker ${process.pid} listening on port ${port}`);
    });
}
