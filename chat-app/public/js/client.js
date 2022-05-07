const socket = io();

socket.on('welcomeMessage', (message) => {
    console.log(message);
});

const formSubmitButton = document.querySelector('#message-form input[type="submit"]');
formSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const message = document.querySelector('#message-form input[name="message"]').value;
    socket.emit('sendMessage', message);
});

socket.on('newMessage', (message) => {
    console.log(message);
})
