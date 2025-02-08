
import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const client = createClient();
client.connect();

app.post("/post", async (req, res) => {
    try {
        const { problemId, userId, code, language } = req.body;
        
        // Push submission to Redis list
        await client.lPush("submissions", JSON.stringify({ 
            problemId, 
            userId, 
            code, 
            language 
        }));
        
        // Send single response with JSON data
        res.json({ 
            message: "Submission received successfully",
            status: "success"
        });
    } catch (error) {
        console.error('Error processing submission:', error);
        res.status(500).json({
            message: "Error processing submission",
            status: "error"
        });
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})