module.exports = function(app, inviteModel) {
    app.post("/api/pollyanna/newInvite", newInvite);
    app.get("/api/pollyanna/user/:userId/invites", allInvites);
    app.get("/api/pollyanna/invite/:inviteId", getInvite);

    function newInvite(req, res) {
        var invite = req.body;

        invite = inviteModel.createInvite(invite)
            // handle model promise
            .then(
                // return group if promise resolved
                function (doc) {
                    invite = doc;
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function allInvites(req, res) {
        var userId = req.params.userId;
        var invites = null;

        inviteModel.findAllInvitesByUserId(userId)
            .then(
                function (doc) {
                    invites = doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getInvite(req, res) {
        var inviteId = req.params.inviteId;
        var invite = null;

        inviteModel.findInviteById(inviteId)
            .then(
                function (doc) {
                    invite = doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

}