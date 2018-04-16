var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Thng = mongoose.model("Thng");


router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


router.get('/getAllThngs', function(req, res) {
	Thng.find({}, function(err, thngs) {
		if (err) {
			console.log("Error find the Thng: " + err);
			req.session.error = "An error occured find the Thng.";
			res.send({
				code: 0,
				data: 'failed'
			});
		} else {
			req.session.regenerate(function() {
				res.status(201).send({
					code: 1,
					data: thngs
				});
			});
		}
	})
});

router.get('/thng/:id', function(req, res) {
	var thngId = req.params.id;
	Thng.find({
		_id: thngId
	}, function(err, thng) {
		if (err) {
			console.log("Error find the Thng: " + err);
			req.session.error = "An error occured find the Thng.";
			res.send({
				code: 0,
				data: 'failed'
			});
		} else {
			req.session.regenerate(function() {
				res.status(201).send({
					data: thng
				});
			});
		}
	})
});

router.post('/:id', function(req, res) {
	var thngName = req.body.thngName;
	var description = req.body.description;
	var projectId = req.params.id;
	Thng.create({
		thngName,
		description,
		projectId
	}, function(err, Thng) {
		if (err) {
			console.log("Error creating the Thng: " + err);
			req.session.error = "An error occured creating the Thng.";
			res.send({
				code: 0,
				data: 'failed'
			});
		} else {
			console.log("POST creating new Thng: " + Thng);
			req.session.regenerate(function() {
				res.status(201).send({
					code: 1,
					data: Thng
				});
			});
		}
	});
})

router.post('/:id/properties', function(req, res) {
	var thngId = req.params.id;
	var properties = req.body;

	let sensors = {};

	properties.forEach(function(vaule, index) {
		sensors[`${vaule.key}`] = {
			vaule: vaule['value'],
			name: vaule.key,
		};
	});

	console.log(sensors);

	Thng.update({
			_id: thngId
		}, {
			sensors: sensors
		},
		function(err, Thng) {
			if (err) {
				console.log("Error update the Thng: " + err);
				req.session.error = "An error occured update the Thng.";
				res.send({
					code: 0,
					data: 'failed'
				});
			} else {
				console.log("POST update Thng: " + Thng);
				req.session.regenerate(function() {
					res.status(201).send({
						code: 1,
						data: Thng
					});
				});
			}
		});

})

module.exports = router;