const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', () => {
    console.log('New WebSocket connection');
});

server.listen(3000, () => {
    console.log('Server is running');
});
