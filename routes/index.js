var searoute = require('searoute-js');
var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sea Route Server' });
});

/* POST */
router.post('/', function(req, res, next) {
  var origin = getGeoJson(req.body.origin);
  var destination = getGeoJson(req.body.destination);
  var units = req.body.units != '' ? req.body.units : 'nm';
  var data = searoute(origin, destination, units);
  res.jsonp(data);
});

function getGeoJson(gps) {
  return {
    "type": "Feature",
    "properties": {},
    "geometry": {
    "type": "Point",
    "coordinates": [
      gps.lng,
      gps.lat
    ]
    }
  };
}

module.exports = router;
