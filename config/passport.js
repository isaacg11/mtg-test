const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, false, {message: 'invalid user'})
    }
    if(!user.validatePassword(password)) {
      return done(null, false, {message: 'password does not match'})
    }
    return done(null, user);
  })
}))

module.exports = User;