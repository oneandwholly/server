var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '9200',
  database : 'my_db'
});

connection.connect();

connection.query(`SELECT id FROM users WHERE email="jonhuh@gmail.com"`, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].id);
});

connection.end();
//
// var secret = require('./config');
// console.log(secret);
//
// CREATE TABLE users (
//   id CHAR(36) NOT NULL PRIMARY KEY,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   password VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT NOW()
// );
//
// INSERT INTO users (id, email, password) VALUES (UUID(), 'jonhuh@gmail.com', '1234');
//
// class User {
//   constructor({email, password}) {
//     this.email = email;
//     this.password = password;
//
//   }
//
//   say() {
//     console.log(this.email + this.password);
//   }
// }
//
// User.findOne = function() {
//   const jon = new User({email: 'jon', password: '1234'});
//   return jon;
// }
//
// User.findOne().say();
//
// module.exports = User;
