const users = [];

function saveUser(id, username, room) {
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        };
    }

    const usernameOriginal = username;
    username = username.toLowerCase();
    room = room.toLowerCase();

    const isUserAlreadyExisting = users.find(user => user.username === username && user.room === room);
    if (isUserAlreadyExisting) {
        return {
            error: 'Please use different username, because this is already in use!'
        };
    }

    const user = { id, usernameOriginal, username, room };
    users.push(user);
    
    return { user };
}

function getUser(id) {
    return users.find(user => user.id === id);
}

function getUsersByRoom(room) {
    return users.filter(user => user.room === room);
}

function removeUser(id) {
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return false;
    }

    return users.splice(userIndex, 1)[0];
}

module.exports = {
    saveUser,
    getUser,
    getUsersByRoom,
    removeUser
};