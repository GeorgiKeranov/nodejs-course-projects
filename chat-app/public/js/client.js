const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

const formSubmitButton = document.querySelector('#message-form input[type="submit"]');
formSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const message = document.querySelector('#message-form input[name="message"]').value;
    socket.emit('sendMessage', message);
});
