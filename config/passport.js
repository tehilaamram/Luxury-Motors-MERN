var User = require('../models')("User");
var ReverseMd5 = require('reverse-md5')
var reverseMd5 = ReverseMd5({
    lettersUpper: true,
    lettersLower: true,
    numbers: true,
    special: true,
    whitespace: true,
    maxLen: 12
});
const LocalStrategy = require('passport-local').Strategy;
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            console.log('password ', password);
            // Match user
            User.findOne({
                email: email,
            }).then(user => {
                console.log("found", user);
                if (!user) {
                    return done(null, false, { message: 'email' });
                }
                if (user.password === reverseMd5(password)) {
                    console.log('in ap');
                    return done(null, user);
                }
                return done(null, false, { message: 'password' });
            });
        })
    );
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}