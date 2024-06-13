const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables here as well

const mongoURL = process.env.MONGO_URL || "your-default-mongo-url-here"; // Provide a default URL if needed

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Mongodb Connection Successful'))
.catch(err => console.error('Error connecting to database:', err));

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.log('Error connection to database:', err);
});

connection.on('connected', () => {
    console.log('Mongodb Connection Successful');
});

module.exports = connection;
