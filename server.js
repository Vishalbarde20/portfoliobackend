const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const portfolioRoute = require("./routes/portfolioRoute");
const contactRoute = require('./routes/contact');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/portfolio", portfolioRoute);
app.use('/api', contactRoute);

// MongoDB Connection
const dbConfig = process.env.MONGO_URL;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    });

// Start the Server
const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server listening on port ${port}`);
    }
}).on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EACCES') {
        console.error(`Port ${port} requires elevated privileges`);
        process.exit(1);
    }
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
    }
});
