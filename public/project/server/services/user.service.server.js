var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function(app, userModel, groupModel) {

    var auth = authorized;

    app.post("/api/pollyanna/login", passport.authenticate('local'), login);
    app.get("/api/pollyanna/loggedin", loggedin);
    app.post("/api/pollyanna/logout", logout);
    app.post("/api/pollyanna/register", register);
    app.post("/api/pollyanna/user", auth, createUser);
    app.get("/api/pollyanna/user", auth, findAllUsers);
    app.post("/api/pollyanna/user/email", auth, findUserByEmail);
    app.get("/api/pollyanna/safe/user", auth, findAllUsersSafe);
    app.post("/api/pollyanna/user/array", auth, findUsersByIds);
    app.get("/api/pollyanna/user/array/:id", auth, findUsersByGroup);
    app.put("/api/pollyanna/user/:id", auth, updateUser);
    app.delete("/api/pollyanna/user/:id", auth, deleteUser);
    app.get("/api/pollyanna/user/:id", auth, findUserById);

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

    function findUsersByIds(req, res) {
        var userIDs = req.body.userIDs;
        userModel
            .findUsersByIds(userIDs)
            .then(function(users) {
                res.json(users);
            })
    }


    function findUserByEmail(req, res) {
        var email = req.body.email;
        userModel
            .findUserByEmail(email)
            .then(function(user){
                if(user) {
                    delete user.password;
                    res.json(user);
                }
                else {
                    res.json(null);
                }
            })
    }

    function register(req, res) {
        var newUser = req.body;

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
    

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function findAllUsers(req, res) {
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["standard"];
        }
        if(typeof newUser.groups == "string") {
            newUser.groups = newUser.groups.split(",");
        }
        else {
            newUser.groups = [];
        }


        userModel
            .findUserByEmail(newUser.email)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }


    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .removeUser(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        if(typeof newUser.groups == "string") {
            newUser.groups = newUser.groups.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    
    function findUserById(req, res) {
        userModel
            .findUserById(req.params.id)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findUsersByGroup(req, res) {
        groupModel
            .findGroupById(req.params.id)
            .then(function(group) {
                userModel
                    .findUsersByIds(group.members)
                    .then(
                        function(users){
                            res.json(users);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );
            });
    }

    function findAllUsersSafe(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    for (user in users){
                        delete user.password;
                    }
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );
    }

}
