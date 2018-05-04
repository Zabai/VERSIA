var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');
var saltRounds = 10;
var connection = require('../db/db');

module.exports = function(passport) {

    // passport session setup

    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function(email, done) {
        connection.query("SELECT * FROM users WHERE email = ? ", [email], function(err, rows) {
            done(err, rows[0]);
        });
    });

    passport.serializeUser(function(user, cb) {
        cb(null, user.email);
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        connection.query("SELECT * FROM users WHERE email=:email", {email: email},
            function(err, rows) {
                if(err) return done(err);
                if(rows.length) return done(null, false, req.flash('errorMessage', 'Usuario ya existente'));
                else {
                    bcrypt.hash(password, saltRounds, function(err, hashedPassword){
                        if(err) return done(err);
                        var newUser = {
                            email: email,
                            pasword: hashedPassword
                        };
                        connection.query("INSERT INTO users (email, password) VALUES (:email,:password)", {
                                email: email,
                                password: hashedPassword
                            },
                            function(err, rows) {
                                if(err) throw err;

                                connection.query("INSERT INTO profiles (user_id, email) VALUES ((SELECT id FROM users WHERE email=:email), :email)", {email: email}, function(err, rows){
                                    if(err) return done(err);
                                    return done(null, newUser, req.flash('signupMessage','Por favor, diríjase al perfil para completar el registro.'));
                                });
                            });
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
        function(req, email, password, done) {

            if(!email || !password) {
                return done(null, false);
            }
            connection.query("SELECT * FROM users WHERE email = ?", [email], function(err, rows) {
                if(err) {
                    return done(err);
                }
                if(!rows.length) {
                    console.log(email);
                    console.log(rows.length, 'test');
                    return done(null, false, req.flash('errorMessage', 'Usuario no encontrado.'));
                }
                // if the user is found but the password is wrong
                bcrypt.compare(password, rows[0].password, function (err, res) {
                    if(err)return done(null, false, req.flash('errorMessage', 'Error en la DB.'));
                    if(!res)return done(null, false, req.flash('errorMessage', 'Contraseña incorrecta.'));
                    return done(null, rows[0]);
                });
            });
        }
    ));
};

