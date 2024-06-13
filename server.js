const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables at the top
const app = express();
const dbConfig = require("./dbConfig");

const portfolioRoute = require("./routes/portfolioRoute");
const contactRoute = require('./routes/contact');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/portfolio", portfolioRoute);
app.use('/api', contactRoute);

const port = process.env.PORT || 5000; 
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
