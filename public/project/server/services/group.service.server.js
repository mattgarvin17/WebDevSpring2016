var mongoose = require('mongoose');

module.exports = function(app, groupModel) {

    app.post("/api/pollyanna/group", createGroup);
    app.put("/api/pollyanna/group/:id", updateGroup);
    app.delete("/api/pollyanna/group/:id", deleteGroup);
    app.get("/api/pollyanna/group", findAllGroups);
    app.get("/api/pollyanna/group/:id", findGroupById);
    app.get("/api/pollyanna/group/leader/:id", findAllGroupsByLeaderId);
    app.get("/api/pollyanna/group/array", findGroupsByIds);



    function createGroup(req, res) {
        var newGroup = req.body;
        if(newGroup.members && newGroup.members.length > 1) {
            newGroup.members = newGroup.members.split(",");
        } else {
            newGroup.members = [];
        }
            groupModel.createGroup(newGroup)
                .then(
                    function (group) {
                        return groupModel.findAllGroups();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (groups) {
                        res.json(groups);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
    }
            
    

    function updateGroup(req, res) {
        var newGroup = req.body;

        groupModel.updateGroup(req.params.id, newGroup)
            .then(
                function(group){
                    return groupModel.findAllGroups();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(groups){
                    res.json(groups);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function deleteGroup(req, res) {
        groupModel
            .removeGroup(req.params.id)
            .then(
                function(group){
                    return groupModel.findAllGroups();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(groups){
                    res.json(groups);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllGroups(req, res) {
        groupModel.findAllGroups()
            .then(
                function(groups){
                    res.json(groups);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findGroupById(req, res) {
        groupModel.findGroupById(req.params.id)
            .then(
                function(group){
                    res.json(group);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findGroupsByIds(req, res) {
        var IDs = req.body;
        groupModel
            .findGroupsByIds(IDs)
            .then(
                function(groups){
                    res.json(groups);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllGroupsByLeaderId(req, res) {
        groupModel.findAllGroupsByLeaderId(req.params.id)
            .then(
                function(groups){
                    res.json(groups);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
}