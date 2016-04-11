module.exports = function(app, userModel) {
    app.post("/api/pollyanna/login", login);
    app.get("/api/pollyanna/loggedin", loggedin);
    app.post("/api/pollyanna/logout", logout);
    app.post("/api/pollyanna/register", register);
    app.get("/api/pollyanna/profile/:userId", profile);

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
        var user = req.body;

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        // just return the user of the current session, null otherwise
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}
