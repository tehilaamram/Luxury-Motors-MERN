let path = require('path');
let express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let debug = require('debug')('lab7:app'); // add using the debugger tool
let mongoose = require('mongoose');  // add mongoose for MongoDB access

let session = require('express-session'); // add session management module
let connectMongo = require('connect-mongo'); // add session store implementation for MongoDB
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var vehicleRouter = require('./routes/vehicle');
var orderRouter = require('./routes/order');
var chatRoomsRouter = require('./routes/chatRoom');
var requestRouter = require('./routes/request');
var commentRouter = require('./routes/comment');
// var chatMessageRouter = require('./routes/')

let app = express();
(async () => {
    let MongoStore = connectMongo(session);
    let sessConnStr = "mongodb://127.0.0.1/luxury-motors-sessions";
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


    app.use(logger('dev'));
    /* for saving session in client side and not blocking the request at server side */ 
    app.use(cors({credentials: true, origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003']}));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    let secret = 'luxury'; // must be the same one for cookie parser and for session
    app.use(
        bodyParser.urlencoded({
            extended: false
        })
    )
    app.use(cookieParser(secret));
    app.use(bodyParser.json({limit: '50mb'}));

    app.use(session({
        // cookieName: 'session', // automatically used by passport sessions
        // httpOnly: false,
        // name: 'session',         // the name of session ID cookie
        secret: secret,            // the secret for signing the session ID cookie - mandatory option
        resave: false,             // do we need to resave unchanged session? (only if touch does not work)  - mandatory option
        saveUninitialized: false,  // do we need to save an 'empty' session object? - mandatory option
        rolling: true,             // do we send the session ID cookie with each response?
        store: new MongoStore({ mongooseConnection: sessionConnect }), // session storage backend
        cookie: {  httpOnly: true, sameSite: true}  // cookie parameters
        // maxAge: 1000 * 60 * 150,
        // NB: maxAge is used for session object expiry setting in the storage backend as well
    }));
    var User = require('./models')("User");
    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
      // Configure passport middleware
      app.use(passport.initialize());
      app.use(passport.session());
  
      app.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') {
            return next(err);
        }
        // handle CSRF token errors here
        res.status(403);
        res.send('Session has expired or form tampered with.');
    });

    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/user', usersRouter);
    app.use('/vehicle', vehicleRouter);
    app.use('/order', orderRouter);
    app.use('/chatRoom', chatRoomsRouter);
    app.use('/request', requestRouter);
    app.use('/comment', commentRouter);
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
