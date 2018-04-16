var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model("User");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});


// Setup
router.post("/setup", function(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;

    User.create({
        userName,
        password
    }, function(err, user) {
        if (err) {
            console.log("Error creating the user: " + err);
            req.session.error = "An error occured creating the user.";
            res.send({
                code: 0,
                data: 'failed'
            });
        } else {
            console.log("POST creating new user: " + user);
            req.session.regenerate(function() {
                req.session.user = user;
                res.status(201).send({
                    code: 1,
                    data: 'setup'
                });
            });
        }
    });
});

//login
router.post('/login', function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;

    User.findOne({
        userName: userName
    }, function(err, user) {
        if (err) {
            console.log("Error retrieving user " + err);
            req.session.error = "A problem occured while retrieving the user";
            res.send({
                code: 0,
                data: 'failed'
            });
        } else if (user) {
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;

                if (isMatch) {
                    req.session.regenerate(function() {
                        console.log('login');
                        req.session.user = user;
                        req.session.success = "Authenticated as " + user.name;
                        res.status(201).send({
                            code: 1,
                            data: 'login'
                        });
                        //return json
                    });
                } else {
                    console.log('failed');
                    req.session.error = "Authentication failed, please check your password.";
                    res.send({
                        code: 0,
                        data: 'failed'
                    });
                }
            });
        } else {
            req.session.error = "Authentication failed, please check your username.";
            res.send('failed');
        };
    });
});

router.get('/logout', function(req, res, next) {

})
router.get('/show', (req, res, next) => {
    //     MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("test");
    //     dbo.collection("test"). find({}).toArray(function(err, result) { // 返回集合中所有数据
    //         if (err) throw err;
    //         res.render('index', { title: result.toString() });
    //         console.log(result);
    //         db.close();
    //     });
    // });
    User.find({}, function(err, users) {
        if (err) return next(err);
        res.end(users.toString());
    });
});
module.exports = router;