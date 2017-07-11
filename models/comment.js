// CREATE TABLE comments (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     comment_text VARCHAR(255) NOT NULL,
//     user_id CHAR(36) NOT NULL,
//     photo_id INT NOT NULL,
//     created_at TIMESTAMP DEFAULT NOW(),
//     FOREIGN KEY(user_id) REFERENCES users(id),
//     FOREIGN KEY(photo_id) REFERENCES photos(id)
// );

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '9200',
  database : 'my_db'
});

connection.connect();

class Comment {
  constructor({comment_text, photo_id, user_id}) {
    this.comment_text = comment_text;
    this.photo_id = photo_id;
    this.user_id = user_id;
  }

  save(cb) {
    const comment = this;
    connection.query(`INSERT INTO comments (comment_text, user_id, photo_id) VALUES ('${comment.comment_text}', '${comment.user_id}', '${comment.photo_id}' )`,
      function(err, results) {
        if (err) throw err;
        cb();
      });
  }
}

Comment.findByPhotoId = function(id, cb) {
  console.log(id)
  connection.query(`SELECT * FROM comments WHERE photo_id='${id}' ORDER BY created_at`, function(err, results) {
    if (err) {
      cb(err);
      return;
    }
    console.log(results);
  //  if (results.length) {
      cb(null, results);
      return;
    //}
    cb(null, false);
  });

}

module.exports = Comment;
