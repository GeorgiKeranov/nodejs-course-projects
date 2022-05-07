const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

const server = http.createServer(app);
const io = socketio(server);

let count = 0;

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++;
        io.emit('countUpdated', count);
    });
});

server.listen(3000, () => {
    console.log('Server is running');
});
