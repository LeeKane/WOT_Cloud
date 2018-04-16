var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Project = mongoose.model("Project");

router.post("/create", function(req, res) {
	var projectName = req.body.projectName;
	var description = req.body.description;

	Project.create({
		projectName,
		description
	}, function(err, project) {
		if (err) {
			console.log("Error creating the project: " + err);
			req.session.error = "An error occured creating the project.";
			res.send({
				code: 0,
				data: 'failed'
			});
		} else {
			console.log("POST creating new project: " + project);
			req.session.regenerate(function() {
				res.status(201).send({
					code: 1,
					data: project
				});
			});
		}
	});
});

module.exports = router;