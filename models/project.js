var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
	projectName: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	created_on: {
		type: Date,
		default: Date.now
	}
});

// export
mongoose.model('Project', projectSchema);