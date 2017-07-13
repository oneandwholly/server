// CREATE TABLE users (
//   id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
//   username VARCHAR(255) NOT NULL UNIQUE,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   password VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT NOW()
// );

const bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '9200',
  database : 'my_db'
});

connection.connect();

class User {
  constructor({id, username, email, password}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save(cb) {
    const user = this;
    console.log('in save')
    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        cb(err);
        return;
      } //try cb(err) return;

      // hash (encrypt) password with salt
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          cb(err);
          return;
        } //try cb(err) return;

        // overwrite plain text password w/ encrypted password
        user.password = hash;
        connection.query(`INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}', '${user.password}' )`,
          function(err, results) {
            if (err) throw err;
            connection.query(`SELECT LAST_INSERT_ID() AS id`, function (err, results) {
              if (err) throw err;
              user.id = results[0].id;
              cb();
            });
          });
      });
    });
  }

  comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) { return callback(err); }
      callback(null, isMatch);
    });
  }
}


// See if a user with the username email exists
User.findOne = function({ username }, cb) {
  connection.query(`SELECT * FROM users WHERE username='${username}'`, function(err, results) {
    if (err) {
      cb(err);
      return;
    }
    if (results.length) {
      const { id, username, email, password } = results[0];
      const user = new User({ id, username, email, password });
      cb(undefined, user);
      return;
    }
    cb(undefined, false);
  });
}

User.findById = function(id, cb) {
  connection.query(`SELECT * FROM users WHERE id='${id}'`, function(err, results) {
    if (err) {
      cb(err);
      return;
    }
    if (results.length) {
      const retrievedUser = results[0];
      const user = new User({id: retrievedUser.id, email: retrievedUser.email, password: retrievedUser.password });
      cb(undefined, user);
      return;
    }
    cb(undefined, false);
  });

}

module.exports = User;
