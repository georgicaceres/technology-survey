const countriesService = require('../services/countriesService');
const self = {};

self.countries = function (req, res, next) {
  let countries = countriesService.getCountries();
  res.send(countries);
};

module.exports = self;
