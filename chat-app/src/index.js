const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello chat app!');
});

app.listen(3000, () => {
    console.log('Server is running');
});
