const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('error', () => {
    console.log('Error connection to database');
});

connection.on('connected', () => {
    console.log('Mongodb Connection Sucssefull');
});

module.exports = connection;