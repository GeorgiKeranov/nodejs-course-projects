const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input[name="message"]');
const $messageFormSubmitInput = $messageForm.querySelector('input[type="submit"]');

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = $messageFormInput.value;
    $messageFormInput.value = '';

    // Disable form
    $messageFormSubmitInput.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', message, () => {
        // Enable form
        $messageFormSubmitInput.removeAttribute('disabled');
    });
});
