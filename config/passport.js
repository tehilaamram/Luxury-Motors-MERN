// const passport = require('passport');
const Users = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport) {
passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const userObj = await Users.findById(id, '-password');
        return done(null, userObj);
    }
    catch (error) {
        done(error);
    }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async function(req, email, password, done) {
    const userObj = await Users.findOne({email: email, password: password});
    if (userObj.length() > 0) {
        return done(null, {id: userObj._id});
    }
    return done(null, false);
}));
}

// module.exports = passport;