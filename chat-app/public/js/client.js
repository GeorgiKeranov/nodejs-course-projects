const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input[name="message"]');
const $messageFormSubmitInput = $messageForm.querySelector('input[type="submit"]');
const $sendLocationButton = document.querySelector('#send-location');
const $messagesContainer = document.querySelector('#messages-container');

const socket = io();

const messageTemplate = '<div><p><small>__DATE__</small> __MESSAGE__</p></div>';
socket.on('message', (message) => {
    let messageHTML = messageTemplate.replace('__MESSAGE__', message.message);

    let formatedDate = new Date(message.date).toLocaleString();
    messageHTML = messageHTML.replace('__DATE__', formatedDate);

    $messagesContainer.innerHTML += messageHTML;
});

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

$sendLocationButton.addEventListener('click', function() {
    this.setAttribute('disabled', 'disabled');

    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser');
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const cordinates = position.coords;
        const lat = cordinates.latitude;
        const lng = cordinates.longitude;

        socket.emit('sendLocation', lat, lng, () => {
            this.removeAttribute('disabled');
        });
    });
});
