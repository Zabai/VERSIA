
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
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.email);
});

passport.deserializeUser(function(email, cb) {
    var client = require('../db/db');

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM user WHERE email = ?",[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false);
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        email: email,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO user ( email, password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.email, newUserMysql.password],function(err, rows) {
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

            connection.query("SELECT * FROM user WHERE email = ?",[email], function(err, rows){
                if (err){
                    return done(err);}
                if (!rows.length) {
                    return done(null, false);
                }
                // if the user is found but the password is wrong
                //if (!bcrypt.compareSync(password, rows[0].password))
                if(password !== rows[0].password)
                    return done(null, false);

                // all is well, return successful user
                return done(null, rows[0]);
            });

        }

    ));
};

