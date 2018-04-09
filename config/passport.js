var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, cb) {
    var client = require('../db/db');

    client.query('SELECT * FROM user WHERE email=:email', {email: email},
        function(err, user) {
            if(err) return cb(err);
            if(user.length === 0) return cb(null, false, { message: 'Usuario no encontrado.' });
            if(user[0].password !== password) return cb(null, false, { message: 'Contraseña incorrecta.' });

            return cb(null, user[0]);
        });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.email);
});

passport.deserializeUser(function(email, cb) {
    var client = require('../db/db');

    client.query('SELECT * FROM user WHERE email=:email', {email: email},
        function(err, user) {
            if(err) return cb(err);
            else cb(null, user[0]);
        });
});

module.exports = passport;