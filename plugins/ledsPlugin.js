// var resources = require('../resources/model');

// var actuator, interval;
// var model = resources.pi.actuators.leds['1'];
// var pluginName = model.name;
// var localParams = {
// 	'simulate': false,
// 	'frequency': 2000
// };

// exports.start = function(params) {
// 	localParams = params;
// 	observe(model); //#A

// 	if (localParams.simulate) {
// 		simulate();
// 	} else {
// 		connectHardware();
// 	}
// };


// exports.stop = function() {
// 	if (localParams.simulate) {
// 		clearInterval(interval);
// 	} else {
// 		actuator.unexport();
// 	}
// 	console.info('%s plugin stopped!', pluginName);
// };

// function observe(what) {
// 	Object.observe(what, function(changes) {
// 		console.info(changes);
// 		// switchOnOff(model.value); //#B
// 	});
// };

// function switchOnOff(value) {
// 	if (!localParams.simulate) {
// 		actuator.write(value === true ? 1 : 0, function() { //#C
// 			console.info('Changed value of %s to %s', pluginName, value);
// 		});
// 	}
// };

// function connectHardware() {
// 	var Gpio = require('onoff').Gpio;
// 	actuator = new Gpio(model.gpio, 'out'); //#D
// 	console.info('Hardware %s actuator started!', pluginName);
// };

// function simulate() {
// 	interval = setInterval(function() {
// 		// Switch value on a regular basis
// 		if (model.value) {
// 			model.value = false;
// 		} else {
// 			model.value = true;
// 		}
// 	}, localParams.frequency);
// 	console.info('Simulated %s actuator started!', pluginName);
// };