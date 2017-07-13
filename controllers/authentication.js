const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(422).send({ error: 'You must provide username, email and password'});
  }

  //TODO: add a check for duplicate username
  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // if a user with email does exist, return an Error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use"});
    }

    // if a user with email does NOT exist, create and save record
    const user = new User({
      username: username,
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      // Respond to request indicating the user was created
      console.log(user);
      res.json({ token: tokenForUser(user) });

    });

  });

};
