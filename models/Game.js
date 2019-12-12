const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  developer: String,
  releaseDate: String
});

const Game = mongoose.model('game', gameSchema);
module.exports = Game;
