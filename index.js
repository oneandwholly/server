// Main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
//const mongoose = require('mongoose');
const cors = require('cors');
const mysql = require('mysql');

//DB Setup
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '9200',
//   database : 'my_db'
// });
//
// connection.connect();
//CREATE TABLE users if you didnt
//mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/json' }))
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

// exports.connection = connection;
