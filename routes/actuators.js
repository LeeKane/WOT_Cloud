var express = require('express');
var router = express.Router();
var resources = require('../resources/model');

router.route('/leds/:id').get(function(req, res, next) {
	res.send(resources.pi.actuators.leds[req.params.id]);
}).put(function(req, res, next) {
	var selectedLED = resources.pi.actuators.leds[req.params.id];
	selectedLED.value = req.body.value;
	res.send(selectedLED);
})

module.exports = router;