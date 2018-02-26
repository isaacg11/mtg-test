const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Card = mongoose.model('Card');

router.post('/', (req, res) => {
  let newCard = new Card();
  newCard.name = req.body.name;
  newCard.user_id = req.body.userId;
  newCard.imageUrl = req.body.imageUrl
  newCard.save((err, nc) => {
    if(err) {
      res.send(err)
    } else {
      res.sendStatus(200);
    }
  })
})

router.get('/:id', (req, res) => {
  Card.find({user_id: req.params['id']}).then((cards) => {
    res.json(cards)    
  })
})

router.delete('/:id',(req, res) => {
  Card.remove({_id: req.params['id']}, function(err) {
    if(err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      console.log('success')
      res.sendStatus(200)
    }
  })

})

module.exports = router;