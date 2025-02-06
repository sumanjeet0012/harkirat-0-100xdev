import express, { Request, Response } from 'express';
import { BACKEND_URL } from "@sumanjeet0012/common/config";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "hello world"
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});