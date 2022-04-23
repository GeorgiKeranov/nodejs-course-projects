const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
});

app.get('/about', (req, res) => {
    res.send('About page!');
});

app.get('/api', (req, res) => {
    res.send({
        name: 'Hello from JSON'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
});