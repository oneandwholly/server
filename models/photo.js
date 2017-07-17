// CREATE TABLE photos (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   img_url VARCHAR(255) NOT NULL,
//   user_id INT NOT NULL,
//   created_at TIMESTAMP DEFAULT NOW(),
//   FOREIGN KEY(user_id) REFERENCES users(id)
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

class Photo {
  constructor({img_url, user_id}) {
    this.img_url = img_url;
    this.user_id = user_id;
  }

  save(cb) {
    const photo = this;
    connection.query(`INSERT INTO photos (img_url, user_id) VALUES ('${photo.img_url}', '${photo.user_id}' )`,
      function(err, results) {
        if (err) throw err;
        cb();
      });
  }
}

Photo.findByUserId = function(id, cb) {
  connection.query(`SELECT * FROM photos WHERE user_id='${id}' ORDER BY created_at DESC`, function(err, results) {
    if (err) {
      cb(err);
      return;
    }
    if (results.length) {
      cb(null, results);
      return;
    }
    cb(null, false);
  });

}

module.exports = Photo;
