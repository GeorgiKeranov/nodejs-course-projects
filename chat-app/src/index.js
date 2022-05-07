const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'New user is connected!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has been disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running');
});
