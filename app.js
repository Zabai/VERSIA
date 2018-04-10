var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

require('./config/passport')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// required for passport
app.use(session({ secret: 'secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Resources
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/popper.js/dist')));

// required for passport
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
} ));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes
app.use('/', require('./routes/index'));
app.use(function isLogged(req, res, next){
    if(req.isAuthenticated()) return next();
    else res.redirect('/');
});
app.use('/users', require('./routes/users'));
app.use('/home', require('./routes/home'));
app.use('/home/users', require('./routes/users'));
app.use('/home/users/friends', require('./routes/friends'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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

app.listen(8080);

module.exports = app;