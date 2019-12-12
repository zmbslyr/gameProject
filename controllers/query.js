const Game = require('../models/Game');
const gameObj = require('../models/gameObj');

/**
 * query - Queries MongoDB database for objects
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

module.exports = query;
