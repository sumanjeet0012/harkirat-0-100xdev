import { games } from "./store";
import { startLogger } from "./logger";

startLogger();

setInterval(() => {
    games.push({
        id: Math.random().toString(),
        whitePlayer: "Sumanjeet",
        blackPlayer: "Aryan",
        moves: []
    })
}, 5000);