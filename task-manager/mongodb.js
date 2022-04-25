const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to the database');
        return;
    }

    console.log('Successfully connected to the database');

    const db = client.db(databaseName);
    const tasksCollection = db.collection('tasks');

    tasksCollection.updateMany(
        { completed: false },
        { $set: { completed: true } }
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
});
