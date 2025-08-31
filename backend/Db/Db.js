const mongoose = require('mongoose');

const BackendUrl = process.env.DATABASE_BASE_URL



function connectDB() {
    mongoose.connect(BackendUrl, { dbName: 'ChatGPT' })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
        })
}

module.exports = connectDB;