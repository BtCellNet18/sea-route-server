var searoute = require('searoute-js');
var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sea Route Server' });
});

/* POST */
router.post('/', function(req, res, next) {
  var data = null;

  try {
    var units = req.body.units;
    var origin = getGeoJson(req.body.origin);
    var destination = getGeoJson(req.body.destination);

    data = searoute(origin, destination, units);
  }
  catch(ex) {
    console.log(ex.message);
  }

  res.jsonp(data);
});

function getGeoJson(position) {
  return {
    "type": "Feature",
    "properties": {},
    "geometry": {
    "type": "Point",
    "coordinates": [
      position.lng,
      position.lat
    ]
    }
  };
}

module.exports = router;
