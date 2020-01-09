const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const query = require('../controllers/query');
let gameObj = require('../models/gameObj');

var search;

router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About' });
});

// Dynamic URL generation for search result
router.post('/submit-form', async (req, res, next) => {
  res.redirect(`/${req.body.title}`);
  search = req.body.title;
  gameObj = await query(search);
});

// POST form
router.get('/:term', (req, res, next) => {
  if (gameObj.name !== search) {
    res.render('gameNotFound', { title: 'Game Not Found', message: 'Game not found', desc: `"${search}" not found in library` });
  } else {
    res.render('obj', { title: gameObj.name, name: gameObj.name, dev: gameObj.developer, rel: `Released: ${gameObj.releaseDate}` });
  }
});

module.exports = router;
