var mongoose = require('mongoose');

module.exports = function(app, inviteModel) {

    app.post("/api/pollyanna/invite", createInvite);
    app.put("/api/pollyanna/invite/:id", updateInvite);
    app.delete("/api/pollyanna/invite/:id", deleteInvite);
    app.get("/api/pollyanna/invite", findAllInvites);
    app.get("/api/pollyanna/invite/:id", findInviteById);
    app.get("/api/pollyanna/invite/group/:groupID", findAllInvitesByGroupId);
    app.get("/api/pollyanna/invite/receiver/:receiverID", findAllInvitesByReceiverId);


    function createInvite(req, res) {
        var newInvite = req.body;

        inviteModel.findInviteByGroupAndReceiver(newInvite.groupID, newInvite.receiverID)
            .then(
                function(invite) {
                    if (!invite) {
                        res.json(null);
                    }
                    else {
                        inviteModel.createInvite(newInvite)
                            .then(
                                function (invite) {
                                    return inviteModel.findAllInvites();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            )
                            .then(
                                function (invites) {
                                    res.json(invites);
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateInvite(req, res) {
        var newInvite = req.body;

        inviteModel.updateInvite(req.params.id, newInvite)
            .then(
                function(invite){
                    return inviteModel.findAllInvites();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(invites){
                    res.json(invites);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function deleteInvite(req, res) {
        inviteModel
            .removeInvite(req.params.id)
            .then(
                function(invite){
                    return inviteModel.findAllInvites();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(invites){
                    res.json(invites);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllInvites(req, res) {
        inviteModel.findAllInvites()
            .then(
                function(invites){
                    res.json(invites);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findInviteById(req, res) {
        inviteModel.findInviteById(req.params.id)
            .then(
                function(invite){
                    res.json(invite);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllInvitesByGroupId(req, res) {
        inviteModel.findAllInvitesByGroupId(req.params.groupID)
            .then(
                function(invites){
                    res.json(invites);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllInvitesByReceiverId(req, res) {
        inviteModel.findAllInvitesByReceiverId(req.params.receiverID)
            .then(
                function(invites){
                    res.json(invites);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
}
