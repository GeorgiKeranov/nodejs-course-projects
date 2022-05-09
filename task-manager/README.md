# Task Manager

Task manager rest API that is built with Express, MongoDB, Mongoose. Users can register and login then they are authenticated by JSON Web Tokens. Authenticated users can update their profile, upload images, logout from all devices, create a task, update a task, read all tasks and remove a task. Also the project has automated tests and they use Jest

## Table of Contents

- [Technologies Used](#technologies-used)
- [How to Install](#how-to-install)
- [How to Use](#how-to-use)

## Technologies Used

- Express
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [env-cmd](https://www.npmjs.com/package/env-cmd)
- [jest](https://www.npmjs.com/package/jest)
- [supertest](https://www.npmjs.com/package/supertest)
- [validator](https://www.npmjs.com/package/validator)
- [nodemon](https://www.npmjs.com/package/nodemon)

## How to Install

Make sure that you have installed [npm](https://www.npmjs.com/) and [node](https://nodejs.dev/) on your machine.

1. Clone the project and open 'task-manager' directory in terminal.
2. Type 'npm install' and wait till all of the packages are installed.
3. Create new folder in 'task-manager' directory with name 'config'.
4. Add two new files as 'dev.env' and 'test.env' in the directory 'task-manager/config/'.
5. In the new files 'dev.env' and 'test.env' you have to type your MONGODB_CONNECTION_URI and JWT_SECRET_KEY.
6. Example of 'dev.env' file contents:
```
MONGODB_CONNECTION_URI=mongodb://127.0.0.1:27017/task-manager-api
JWT_SECRET_KEY=YOUR_SECRET_KEY_HERE
```
7. The difference of 'test.env' file is the database name, it has to be different because we can mess the data in the real database. Example of 'test.env' file:
```
MONGODB_CONNECTION_URI=mongodb://127.0.0.1:27017/task-manager-api-test
JWT_SECRET_KEY=YOUR_SECRET_KEY_HERE
```

## How to Use

1. Open terminal in 'task-manager' directory.
2. You can use these commands:
    - ```npm run dev``` - To start the server on localhost:3000
    - ```npm run test``` - To start the tests
