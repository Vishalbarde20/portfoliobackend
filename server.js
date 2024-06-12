const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

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
