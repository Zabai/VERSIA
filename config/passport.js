var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, cb) {
    var client = require('../db/db');

    client.query('SELECT * FROM User WHERE email=:email', {email: email},
        function (err, user) {
            if (err) return cb(err);
            if (user.length === 0) return cb(null, false, {message: 'Usuario no encontrado.'});
            if (user[0].password !== password) return cb(null, false, {message: 'Contraseña incorrecta.'});

            return cb(null, user[0]);
        });
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.email);
});

passport.deserializeUser(function (email, cb) {
    var client = require('../db/db');

    // find a user whose email is the same as the forms email
    // we are checking to see if the user is trying to login already exists
    connection.query("SELECT * FROM user WHERE email = ?", [email], function (err, rows) {
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

            connection.query(insertQuery, [newUserMysql.email, newUserMysql.password], function (err, rows) {
                newUserMysql.id = rows.insertId;

                return done(null, newUserMysql);
            });
        }
    });

});

// ========================================
// LOCAL LOGIN
// ========================================
passport.use('local-login', new LocalStrategy({

        usernameField: 'email',

        passwordField: 'password',

        passReqToCallback: true //passback entire req to call back
    },
    function (req, email, password, done) {


        if (!email || !password) {
            return done(null, false);
        }

        connection.query("SELECT * FROM user WHERE email = ?", [email], function (err, rows) {
            if (err) {
                return done(err);
            }
            if (!rows.length) {
                return done(null, false);
            }
            // if the user is found but the password is wrong
            //if (!bcrypt.compareSync(password, rows[0].password))
            if (password !== rows[0].password)
                return done(null, false);

            // all is well, return successful user
            return done(null, rows[0]);
        });

    }
));

// ========================================
// LOCAL SIGNUP
// ========================================
passport.use('local-signup', new LocalStrategy({

        usernameField: 'email',

        passwordField: 'password',

        passReqToCallback: true //passback entire req to call back
    },
    function (req, email, password, done) {

        if (!email || !password) {
            return done(null, false);
        }
        connection.query("SELECT * FROM user WHERE email = ?", [email], function (err, rows) {
            if (err) {
                return done(err);
            }
            if (rows.length) {
                //if theres a user with that email, we do not permit him to register.
                return done(null, false);
            } else {
                connection.query("INSERT INTO User(email, password) VALUES (:userEmail, :userPassword)", {userEmail: email, userPassword: password},
                    function (err, newUser) {
                        if (err) return done(null, false);
                        else return done(null, newUser);
                    });
            }
        });

    }
));

