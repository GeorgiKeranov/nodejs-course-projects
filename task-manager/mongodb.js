const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to the database');
        return;
    }

    console.log('Successfully connected to the database');

    const db = client.db(databaseName);
    
    db.collection('tasks').insertMany([
        {
            description: 'Read a book',
            completed: false
        },
        {
            description: 'Clean the dishes',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(result);
    })
});
