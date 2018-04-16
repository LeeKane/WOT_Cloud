var createError = require('http-errors');
var express = require("express");
var pirPlugin = require('./plugins/pirPlugin'),
	thPlugin = require('./plugins/thPlugin');
// ledsPlugin = require('./plugins/ledsPlugin');

var path = require("path"),
	logger = require("morgan"),
	cookieParser = require("cookie-parser"),
	methodOverride = require("method-override"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	session = require("express-session"),
	MongoStore = require("connect-mongo")(session),
	converter = require('./middleware/converter');


// Connect to mongodb
mongoose.connect("mongodb://localhost/test", function(err) {
	if (err) throw err;
	console.log("Successfully connected to mongodb");
});

//use device plugin
pirPlugin.start({
	'simulate': true,
	'frequency': 10000
});
thPlugin.start({
	'simulate': true,
	'frequency': 10000
});
// ledsPlugin.start({
// 	'simulate': true,
// 	'frequency': 100000
// });

// Loading DB models
var user = require("./models/user");
var project = require("./models/project");
var thng = require("./models/thng");

//  Loading routes
var indexRouter = require("./routes/index");
var thngRouter = require("./routes/thngs");
var usersRouter = require("./routes/users");
var piRouter = require("./routes/pi");
var sensorRouter = require("./routes/sensor");
var actuatorsRouter = require("./routes/actuators");
var projectsRouter = require("./routes/projects");


// Start app
var app = express();

//设置跨域访问  
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Registering middlewares to the app
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// We use mongodb to store session info
// expiration of the session is set to 7 days (ttl option)
app.use(session({
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: 7 * 24 * 60 * 60
	}),
	saveUninitialized: true,
	resave: true,
	secret: "MyBigBigSecret"
}));
// used to manipulate post requests and recongize PUT and DELETE operations
app.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === "object" && "_method" in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method
	}
}));


app.use('/', indexRouter);
app.use('/thngs', thngRouter);
app.use('/users', usersRouter);
app.use('/pi', piRouter);
app.use('/pi/sensor', sensorRouter);
app.use('/pi/actuators', actuatorsRouter);
app.use('/projects', projectsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});



// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// app.use(converter());


module.exports = app;