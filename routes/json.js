const express = require('express');
const router = express.Router();
const countriesController = require('../controllers/countriesController');

/* GET users listing. */
router.get('/', countriesController.countries)

module.exports = router;
