const socket = io();

socket.on('countUpdated', (count) => {
    console.log(`Current count is ${count}`);
});

document.querySelector('.btn-increment').addEventListener('click', () => {
    socket.emit('increment');
});