const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  salt: String
})

UserSchema.method("setPassword", function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
})

UserSchema.method("validatePassword", function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
  return (hash === this.passwordHash)
})

UserSchema.method("generateJWT", function() {
  return jwt.sign({
    id: this._id,
    username: this.username,
  }, 'secret key')
})

let User = mongoose.model('User', UserSchema);

module.exports = User;