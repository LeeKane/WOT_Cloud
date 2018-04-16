var msgpack = require('msgpack5')(),
	encode = msgpack.encode, //#A
	json2html = require('node-json2html');

module.exports = function() { //#B
	return function(req, res, next) {
		console.log('Representation converter middleware called!');
		if (req.result) { //#C
			switch (req.accepts(['json', 'html', 'application/x-msgpack'])) { //#D
				case 'html':
					console.log('HTML representation selected!');
					var transform = {
						'tag': 'div',
						'html': '${name} : ${value}'
					};
					res.send(json2html.transform(req.result, transform)); //#E
					return;
				case 'application/x-msgpack':
					console.log('MessagePack representation selected!');
					res.type('application/x-msgpack');
					res.send(encode(req.result)); //#F
					return;
				default: //#G
					console.log('Defaulting to JSON representation!');
					res.send(req.result);
					return;
			}
		} else {
			next(); //#H
		}
	}
};