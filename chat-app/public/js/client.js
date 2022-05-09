const $chatTitle = document.querySelector('.chat .chat__heading h1');
const $usersList = document.querySelector('.chat .chat__users ul');
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input[name="message"]');
const $messageFormSubmitInput = $messageForm.querySelector('input[type="submit"]');
const $sendLocationButton = document.querySelector('#send-location');
const $messagesContainer = document.querySelector('#messages-container');

const socket = io();

const urlParams = new URLSearchParams(location.search);
const username = urlParams.get('username');
const room = urlParams.get('room');

$chatTitle.textContent = room;

socket.on('updateActiveUsers', (users) => {
    $usersList.innerHTML = '';

    for (const user of users) {
        const liElement = document.createElement('li');
        const userText = document.createTextNode(user.usernameOriginal);
        liElement.appendChild(userText);

        $usersList.appendChild(liElement);
    }
});

socket.emit('joinRoom', username, room, (error) => {
    alert(error);
    location.href = '/';
});

const notificationTemplate = 
    `<div class="chat__notification">
        <p>__MESSAGE__</p>
    </div>`;

socket.on('notification', (notification) => {
    const messageHTML = notificationTemplate.replace('__MESSAGE__', escapeHTML(notification));

    $messagesContainer.innerHTML += messageHTML;
    
    autoScrollMessages();
});

const messageTemplate = 
    `<div class="chat__message">
        <p><strong>__AUTHOR__</strong> <small>__DATE__</small></p>
        <p>__MESSAGE__</p>
    </div>`;

socket.on('message', (message) => {
    let messageHTML = messageTemplate.replace('__MESSAGE__', escapeHTML(message.message));
    messageHTML = messageHTML.replace('__AUTHOR__', escapeHTML(message.author));

    let formatedDate = new Date(message.date).toLocaleString();
    messageHTML = messageHTML.replace('__DATE__', formatedDate);

    $messagesContainer.innerHTML += messageHTML;

    autoScrollMessages();
});

const locationMessageTemplate = 
    `<div class="chat__message">
        <p><strong>__AUTHOR__</strong> <small>__DATE__</small></p>
        <p><a href="__LINK__" target="_blank">My location</a></p>
    </div>`;

socket.on('location', (message) => {
    let messageHTML = locationMessageTemplate.replace('__LINK__', message.message);
    messageHTML = messageHTML.replace('__AUTHOR__', escapeHTML(message.author));

    let formatedDate = new Date(message.date).toLocaleString();
    messageHTML = messageHTML.replace('__DATE__', formatedDate);

    $messagesContainer.innerHTML += messageHTML;

    autoScrollMessages();
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

function escapeHTML(unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
}

function autoScrollMessages() {
    const $lastMessage = $messagesContainer.lastElementChild;

    // Get full height including margins of the last message
    const lastMessageStyles = window.getComputedStyle($lastMessage);
    const lastMessageMargins = parseInt(lastMessageStyles.marginTop) + parseInt(lastMessageStyles.marginBottom);
    const lastMessageFullHeight = $lastMessage.offsetHeight + lastMessageMargins;

    // Get the maximum scroll top position that can be on the messages element
    const messagesMaxScrollTop = $messagesContainer.scrollHeight - $messagesContainer.offsetHeight;
    // Remove height of the last message
    const messagesMaxScrollTopWithoutLastMessage = messagesMaxScrollTop - lastMessageFullHeight;
    // Check if we were at the bottom of the messages before last message was inserted
    const messagesScrollWasAtTheBottom = messagesMaxScrollTopWithoutLastMessage <= $messagesContainer.scrollTop;

    // Scroll to the bottom
    if (messagesScrollWasAtTheBottom) {
        $messagesContainer.scrollTop = messagesMaxScrollTop;
    }
}
