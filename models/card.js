const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  name: String,
  user_id: String,
  cmc: Number,
  imageUrl: String,
  color: String,
  type: String,
  subtype: String
})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card