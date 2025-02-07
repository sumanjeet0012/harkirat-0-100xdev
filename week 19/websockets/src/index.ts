import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + " Received request for " + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(socket) {
    socket.on('error', console.error)
    
    socket.on('message', (message) => {
        console.log('Received:', message.toString());
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, function () {
    console.log((new Date()) + " Server is listening on port 8080")
})