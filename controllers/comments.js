const Comment = require('../models/comment');

exports.add = function(req, res, next) {
  const comment_text = req.body.comment_text;
  const photo_id = req.body.photo_id;
  const user_id = req.user.id;

  const comment = new Comment({comment_text, photo_id, user_id});
  comment.save(function(err) {
    if (err) {
      return next(err);
    }
    res.writeHead(200);
    res.end();
    next();
  });
}
