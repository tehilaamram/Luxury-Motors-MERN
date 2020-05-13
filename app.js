let path = require('path');
let express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// var createError = require('http-errors');
// let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let debug = require('debug')('lab7:app'); // add using the debugger tool
let mongoose = require('mongoose');       // add mongoose for MongoDB access
let session = require('express-session'); // add session management module
let connectMongo = require('connect-mongo'); // add session store implementation for MongoDB
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var vehicleRouter = require('./routes/vehicle');
var orderRouter = require('./routes/order');

let app = express();

(async () => {
    let MongoStore = connectMongo(session);
    let sessConnStr = "mongodb://127.0.0.1/buy-a-luxury-vehicle-sessions";
    let sessionConnect = mongoose.createConnection();
    try {
        await sessionConnect.openUri(sessConnStr, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (err) {
        debug(`Error connecting to session backend DB: ${err}`);
        process.exit(0);
    }
    process.on('SIGINT', async () => {
        await sessionConnect.close();
        process.exit(0);
    });

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');


    // Configure passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    let secret = 'luxury'; // must be the same one for cookie parser and for session
    app.use(cookieParser(secret));

    app.use(session({
        name: 'users.sid',         // the name of session ID cookie
        secret: secret,            // the secret for signing the session ID cookie - mandatory option
        resave: false,             // do we need to resave unchanged session? (only if touch does not work)  - mandatory option
        saveUninitialized: false,  // do we need to save an 'empty' session object? - mandatory option
        rolling: true,             // do we send the session ID cookie with each response?
        store: new MongoStore({ mongooseConnection: sessionConnect }), // session storage backend
        cookie: { maxAge: 900000, httpOnly: true, sameSite: true }  // cookie parameters
        // NB: maxAge is used for session object expiry setting in the storage backend as well
    }));

    // app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/user', usersRouter);
    app.use('/vehicle', vehicleRouter);
    app.use('/order', orderRouter);
    


// Configure passport-local to use account model for authentication
var User = require('./models')("User");
// passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// passport.serializeUser(function(user, done) {
//     console.log(user, ' user ser');
//   done(null, user.email);
// });
 
// passport.deserializeUser(function(id, done) {
//     console.log(id, ' id de');
//   User.findByUsername(id, function (err, user) {
//     done(err, user);
//   });
// });


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        let err = new Error('Not Found');
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
})()
    .catch(err => { debug(`Failure: ${err}`); process.exit(0); });

module.exports = app;
