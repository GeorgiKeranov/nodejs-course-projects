const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('Hello Express!');
});

app.get('/about', (req, res) => {
    res.send('About page!');
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
});