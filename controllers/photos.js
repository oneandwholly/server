const aws = require('../services/aws');
const Photo = require('../models/photo');

exports.upload = function(req, res, next) {
  const img_url = `https://${req.body.bucket}.s3.amazonaws.com/${req.body.key}`;
  const user_id = req.user.id;

  const photo = new Photo({img_url, user_id});
  photo.save(function(err) {
    if (err) {
      return next(err);
    }
    const resp = JSON.stringify({
      policy: req.body,
      signature: aws.signRequest(req.body)
    });

    res.writeHead(200, {
      'Content-Length': resp.length,
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(resp);
  });
}

exports.fetchAll = function(req, res, next) {
  Photo.findByUserId(req.user.id, function(err, photos) {
    if (err) { return next(err); }
    if (photos) {
      const resp = JSON.stringify(photos);

      res.writeHead(200, {
        'Content-Length': resp.length,
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(resp);
    } else {
      next();
    }
  })
}
