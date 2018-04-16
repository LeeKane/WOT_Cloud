var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
    SALT_WORK_FACTOR = 10; // use the most strict rule

var userSchema = new Schema({
    userName: {type: String, require: true},
    password: {type: String, require: true},
    created_on: {type: Date, default: Date.now}
});

//use hashing middleware to schema
userSchema.pre('save', function(next){
    var user = this;

    if(!user.isModified("password")) next();

    // hash the password
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, next){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        next(null, isMatch);
    })
}

// export
mongoose.model('User', userSchema);