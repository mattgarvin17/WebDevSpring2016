module.exports = function(app, groupModel) {
    app.post("/api/pollyanna/newGroup", newGroup);
    app.get("/api/pollyanna/user/:userId/groups", allGroups);
    app.get("/api/pollyanna/group/:groupId", getGroup);

    function newGroup(req, res) {
        var group = req.body;

        group = groupModel.createGroup(group)
            // handle model promise
            .then(
                // return group if promise resolved
                function (doc) {
                    req.session.currentGroup = doc;
                    res.json(group);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function allGroups(req, res) {
        var userId = req.params.userId;
        var groups = null;

        groupModel.findAllGroupsByUserId(userId)
            .then(
                function (doc) {
                    groups = doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getGroup(req, res) {
        var groupId = req.params.groupId;
        var group = null;

        groupModel.findGroupById(groupId)
            .then(
                function (doc) {
                    req.session.currentGroup = doc;
                    res.json(group);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

}