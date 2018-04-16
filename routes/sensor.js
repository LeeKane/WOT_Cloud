var express = require('express');
var router = express.Router();
var resources = require('../resources/model');

router.get('/', function(req, res, next) {
	res.send(resources.pi.sensors);
});

router.get('/pir', function(req, res, next) {
	res.send(resources.pi.sensors.pir);
});

router.get('/temperature', function(req, res, next) {
	res.send(resources.pi.sensors.temperature);
});


router.get('/humidity', function(req, res, next) {
	res.send(resources.pi.sensors.humidity);
});

module.exports = router;