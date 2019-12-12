const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const query = require('../controllers/query');
let gameObj = require('../models/gameObj');

var search;

router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// POST form
router.post('/submit-form', async (req, res, next) => {
  search = req.body.title;
  gameObj = await query(search);
  res.render('obj', { name: gameObj.name, dev: gameObj.developer, rel: gameObj.releaseDate });
});

module.exports = router;
