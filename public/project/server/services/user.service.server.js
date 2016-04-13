var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function(app, userModel) {
    //var userModel = require('WebDevSpring2016/public/project/server/models/user.model.server.js')();
    var auth = authorized;

    app.post("/api/pollyanna/login", passport.authenticate('local'), login);
    app.get("/api/pollyanna/loggedin", loggedin);
    app.post("/api/pollyanna/logout", logout);
    app.post("/api/pollyanna/register", register);
    app.get("/api/pollyanna/profile/:userId", profile);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({email: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by id
        userModel.findUserById(userId)
            .then(

                // first retrieve the user by user id
                function (doc) {

                    user = doc;

                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['standard'];

        userModel
            .findUserByEmail(newUser.email)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
}
