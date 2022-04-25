const express = require('express');

const app = express();

app.post('/users', (req, res) => {
    res.send('working!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
