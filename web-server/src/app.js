const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

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