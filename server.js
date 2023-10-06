const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const client = require('./database');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config({
    path: "./config.env",
});

const server = http.createServer(app);


// CORS
app.use(cors());


const port = process.env.PORT || 8010;
server.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});

const ErrorHandler = require('./middleware/errorHandler')
app.use(ErrorHandler)

const register = require('./api/register');
app.use('/signup', register)

const login = require('./api/login');
app.use('/login', login)

const details = require('./api/details');
app.use('/details', details)

const plans = require('./api/plan');
app.use('/plan', plans)

const logout = require('./api/logout');
app.use('/logout', logout)