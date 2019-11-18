const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const uri = 'mongodb+srv://readOnly:readOnly@devcluster-ex9ge.mongodb.net/devDB';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var search;

const gameSchema = new Schema({
  name: String,
  developer: String,
  releaseDate: String
});

var gameObj = {
  name: 'placeholder',
  developer: 'placeholder',
  releaseDate: 'placeholder'
};

const Game = mongoose.model('game', gameSchema);

router.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
    mongoose.disconnect();
  }
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// POST form
router.post('/submit-form', async (req, res, next) => {
  search = req.body.title;
  const gameObj = await query(search);
  res.render('obj', { name: gameObj.name, dev: gameObj.developer, rel: gameObj.releaseDate });
});

/**
 * query - Queries MongoDB database for objects
 * @param {Str} uri: URI to connect to MongoDB
 * @param {Str} input: Input from HTML form
 *
 * Return: Promise to resolve when gameObj is populated
 */
function query (input) {
  return new Promise((resolve, reject) => {
    const query = Game.findOne({ name: input });
    query.exec((err, game) => {
      if (err || game === null) {
        console.log('Game not found');
      } else {
        gameObj.name = game.name;
        gameObj.developer = game.developer;
        gameObj.releaseDate = game.releaseDate;
        resolve(gameObj);
      }
    });
  });
}

module.exports = router;
