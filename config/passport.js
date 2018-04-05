/**
 *
 *  FALTA CIFRADO DE CONTRASEÑAS CON BCRYPT
 *
 */



var LocalStrategy = require('passport-local').Strategy;

var User = require('../db/db.js');       //¿Modelo de usuario en MariaDB?

module.exports = function (passport) {

    // passport session setup

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // ========================================
    // LOCAL SIGNUP
    // ========================================

    passport.use('local-signup', new LocalStrategy({
            // CAMBIAR CON CAMPOS REGISTRO
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.email' :  email }, function(err, user) {

                    if (err)
                        return done(err);

                    if (user) {
                        console.log('Email not available')
                        return done(null, false);
                    } else {

                        //create user
                        var newUser            = new User();

                        // set the user's local credentials
                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    // ========================================
    // LOCAL LOGIN
    // ========================================

    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    console.log('No user found');
                    return done(null, false);

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    console.log('Wrong password');
                    return done(null, false);

                // all is well, return successful user
                return done(null, user);
            });

        }));
};

