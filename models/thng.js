var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thngSchema = new Schema({
	thngName: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	projectId: {
		type: String,
		require: true
	},
	created_on: {
		type: Date,
		default: Date.now
	},
	sensors: {},
	actuators: {},
	properties: [],
	actions: []
});

// export
mongoose.model('Thng', thngSchema);