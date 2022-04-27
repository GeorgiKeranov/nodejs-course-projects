const fs = require('fs');
const path = require('path');
const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const rootDirectory = path.join(__dirname, '../');
const staticDirectory = rootDirectory + 'public/';
const uploadsDirectory = staticDirectory + 'uploads/';

if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory);
}

app.use(express.json());
app.use(express.static(staticDirectory));
app.use(userRouter);
app.use(taskRouter);

app.get('*', (req, res) => {
    res.status(404).send({
        error: 'The API endpoint is not found!'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
