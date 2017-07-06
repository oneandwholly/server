const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');
const aws = require('../services/aws');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // if a user with email does exist, return an Error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use"});
    }

    // if a user with email does NOT exist, create and save record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });

    });

  });

};

exports.sign = function(req, res, next) {
  console.log(req.body);
  const resp = JSON.stringify({
    policy: req.body,
    signature: aws.signRequest(req.body)
  });

  res.writeHead(200, {
    'Content-Length': resp.length,
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(resp);
}
