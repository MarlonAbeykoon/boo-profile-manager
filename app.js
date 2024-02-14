'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const profileRouter = require('./routes/profile');
const commentsRouter = require('./routes/comments');
const userRouter = require('./routes/users');

let mongoServer;

async function startMongoMemoryServer() {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

startMongoMemoryServer()
    .then(() => console.log('MongoDB Memory Server started successfully.'))
    .catch(err => {
        console.error('Error starting MongoDB Memory Server: ', err);
        process.exit(1);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/profiles', profileRouter);
app.use('/profiles/:profileId/comments', commentsRouter);
app.use('/users', userRouter);

app.listen(port, () => console.log(`Express server listening on port ${port}`));

