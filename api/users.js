const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = mongoose.model('User')

router.post('/register', (req, res) => {
  let newUser = new User();
  newUser.username = req.body.username;
  newUser.setPassword(req.body.password);
  newUser.save((err) => {
    if(err) {
      res.send(err);
    } else {
      res.end();
    }
  })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      return next(err)
    }
    if(user) {
      return res.json({token: user.generateJWT()})
    }
    return res.status(400).send(info);
  })(req, res, next);
})

module.exports = router;