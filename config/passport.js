
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

var connection = require('../db/db');

module.exports = function (passport) {

    // passport session setup

    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function(email, done) {
        connection.query("SELECT * FROM user WHERE email = ? ",[email], function(err, rows){
            done(err, rows[0]);
        });
});

passport.serializeUser(function(user, cb) {
    cb(null, user.email);
});

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function (req, email, password, done) {
        connection.query("SELECT * FROM user WHERE email=:email", {email:email},
            function (err, rows) {
                if (err) return done(err);
                if (rows.length) return done(null, false, req.flash('errorMessage', 'Usuario ya existente'));
                else {
                    var newUser  = {
                        email: email,
                        pasword: password
                    };
                    connection.query("INSERT INTO user (email, password) VALUES (:email,:password)", {email: email, password: password},
                        function (err, rows) {
                            if (err) throw err;
                            return done(null, newUser, req.flash('signupMessage', 'Usuario creado correctamente'));
                        });
                }
            });
    }));

    // ========================================
    // LOCAL LOGIN
    // ========================================
    passport.use('local-login', new LocalStrategy({

            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true //passback entire req to call back
        },
        function (req, email, password, done){


            if(!email || !password ) { return done(null, false); }

            connection.query("SELECT * FROM user WHERE email = ?",[email], function(err, rows){
                if (err){
                    return done(err);}
                if (!rows.length) {
                    return done(null, false, req.flash('errorMessage', 'Usuario no encontrado'));
                }
                // if the user is found but the password is wrong
                //if (!bcrypt.compareSync(password, rows[0].password))
                if(password !== rows[0].password)
                    return done(null, false, req.flash('errorMessage', 'Contraseña incorrecta.'));

                // all is well, return successful user
                return done(null, rows[0]);
            });
        }
    ));
};

