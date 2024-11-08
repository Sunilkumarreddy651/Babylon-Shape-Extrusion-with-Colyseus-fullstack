const { Room } = require("colyseus");

class GameRoom extends Room {
    onCreate() {
        this.setState({ players: {} });

        this.onMessage("update", (client, data) => {
            this.state.players[client.sessionId] = data;
            this.broadcast("state_update", this.state.players);
        });
    }

    onJoin(client) {
        console.log(`${client.sessionId} joined`);
        this.state.players[client.sessionId] = { x: 0, y: 0, shape: null };
    }

    onLeave(client) {
        console.log(`${client.sessionId} left`);
        delete this.state.players[client.sessionId];
    }
}

module.exports = GameRoom;
