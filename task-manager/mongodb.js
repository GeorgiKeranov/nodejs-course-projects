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

    tasksCollection.findOne({ _id: new ObjectId('62664e14c8e24e33f9d05afc') }, (error, task) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(task);
    });

    tasksCollection.find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(tasks);
    });
});
