const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { escapeHtml } = require('./utils/escape');
const { generateMessage } = require('./utils/message');
const { saveUser, getUser, getUsersByRoom, removeUser } = require('./utils/users');

const app = express();
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('joinRoom', (username, room, errorCallback) => {
        const { error, user } = saveUser(socket.id, username, room);

        if (error) {
            return errorCallback(error);
        }

        socket.join(user.room);

        socket.emit('notification', `Welcome ${user.usernameOriginal}!`);
        socket.broadcast.to(user.room).emit('notification', `${user.usernameOriginal} has joined!`);
        io.to(user.room).emit('updateActiveUsers', getUsersByRoom(user.room));
    });

    socket.on('sendMessage', (message, callback) => {
        if (!message) {
            return callback();
        }
        
        const user = getUser(socket.id);
        const generatedMessage = generateMessage(escapeHtml(message), user.usernameOriginal);

        io.to(user.room).emit('message', generatedMessage);

        callback();
    });

    socket.on('sendLocation', (lat, lng, callback) => {
        const url = `https://www.google.com/maps/place/${lat},${lng}`;
        const link = `<a href="${url}" target="_blank">My location</a>`;
        
        const user = getUser(socket.id);

        io.to(user.room).emit('message', generateMessage(link, user.usernameOriginal));

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('notification', `${user.usernameOriginal} has left!`);
            io.to(user.room).emit('updateActiveUsers', getUsersByRoom(user.room));
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running');
});
