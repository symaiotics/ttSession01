//Create the app object
const express = require("express");
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1mb' })); //The largest incoming payload

const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000;

const helmet = require('helmet');
app.use(helmet()) //You may need to set parameters such as contentSecurityPolicy: false,

const cors = require('cors');
var corsOptions = {
    origin: ['https://somedomain.com'], //restrict to only use this domain for requests
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, POST, PUT, DELETE" //allowable methods
}

if (process.env.MODE == 'PROD') app.use(cors(corsOptions)); //Restrict CORS
if (process.env.MODE == 'DEV') app.use(cors()); //Unrestricted CORS

//Create HTTP Server
const server = require('http').createServer(app);
server.listen(port, () => console.log(`Simple app listening at http://localhost:${port}`))

if (process.env.MODE == 'DEV') app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/login', require('./routes/login'));