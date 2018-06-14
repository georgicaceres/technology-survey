const service = {};

const countries = {
  "paises":[{
    "nombre":"Argentina",
    "codigo":"AR"
  },{
    "nombre":"Bolivia",
    "codigo":"BO"
  },{
    "nombre":"Brasil",
    "codigo":"BR"
  },{
    "nombre":"Chile",
    "codigo":"CL"
  },{
    "nombre":"Paraguay",
    "codigo":"PY"
  },{
    "nombre":"Uruguay",
    "codigo":"UY"
  }]
};

service.getCountries = function() {
  return countries;
};

module.exports = service;
