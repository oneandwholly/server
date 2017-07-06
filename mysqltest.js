// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '9200',
//   database : 'my_db'
// });
// //
// // connection.connect();
// //
// // connection.query('CREATE TABLE random(num INT)', function (error, results, fields) {
// //   if (error) throw error;
// //   console.log('The solution is: ', results);
// // });
// //
// // connection.end();
//
// var secret = require('./config');
// console.log(secret);
//
// CREATE TABLE users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   password VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT NOW()
// );

class User {
  constructor({email, password}) {
    this.email = email;
    this.password = password;

  }

  say() {
    console.log(this.email + this.password);
  }
}

User.findOne = function() {
  const jon = new User({email: 'jon', password: '1234'});
  return jon;
}

User.findOne().say();

module.exports = User;
