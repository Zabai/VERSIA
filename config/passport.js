/**
 *
 *  FALTA CIFRADO DE CONTRASEÑAS CON BCRYPT
 *
 */



var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

var connection = require('../db/db');

module.exports = function (passport) {

    // passport session setup

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM User WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
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

            console.log('REGISTRO');

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM user WHERE email = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'Usuario ya escogido'));
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO user ( username, password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
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

            connection.query("SELECT * FROM User WHERE email = ?",[email], function(err, rows){
                if (err){
                    return done(err);}
                if (!rows.length) {
                    return done(null, false); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });

        }

    ));
};

