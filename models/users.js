//const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const connection = require('../index').connection;
// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password,
// before saving user, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) password with salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password w/ encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);


// Export the model
module.exports = ModelClass;











class User {
  constructor({email, password}) {

  }

  save(cb) {
    connection.query('save user')
  }

  comparePassword(password, cb) {

  }
}


// See if a user with the given email exists
User.findOne = function({ email }, cb) {
  connection.query('find if email exists')
}

User.findById = function(id, cb) {
  
}

module.exports = User;
