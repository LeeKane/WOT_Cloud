var WebSocketServer = require('ws').Server;
var resources = require('../resources/model');

exports.listen = function(server) {
	var wss = new WebSocketServer({
		server: server
	});
	console.info('WebSocket server started...');
	wss.on('connection', function(ws) {
		// var url = ws.upgradeReq.url;
		// console.log(ws);
		var sendInfoUpdates = function(ws) {
			ws.send(JSON.stringify(resources));
			console.log('update');
		}
		var clientInfoUpdater = setInterval(function() {
			sendInfoUpdates(ws);
		}, 10000);
	});
};

function observeChanges(data) {

}