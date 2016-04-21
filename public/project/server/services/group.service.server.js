var mongoose = require('mongoose');

module.exports = function(app, groupModel, userModel) {

    app.get("/api/pollyanna/group", findAllGroups);
    app.post("/api/pollyanna/group", createGroup);
    app.put("/api/pollyanna/group/:id", updateGroup);
    app.delete("/api/pollyanna/group/:id", deleteGroup);
    app.get("/api/pollyanna/group/user/:id", findGroupsByUser);
    app.get("/api/pollyanna/group/:id", findGroupById);
    app.get("/api/pollyanna/group/leader/:id", findAllGroupsByLeaderId);




    function createGroup(req, res) {
        var newGroup = req.body;
        if(typeof newGroup.members == "string")  {
            newGroup.members = newGroup.members.split(",");
        }
        else {
            newGroup.members = [newGroup.groupLeaderID.toString()];
        }
            groupModel.createGroup(newGroup)
                .then(
                    function (group) {
                        userModel
                            .findUserById(newGroup.groupLeaderID)
                            .then(
                                function(user){
                                    user.groups.push(group._id);
                                    return user.save();
                                    //userModel
                                    //    .updateUser(user._id, user);
                                }
                            )
                        return groupModel.findAllGroups();
                    },
                    function (err) {
                        res.status(400).send(err);
                    })
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
            .deleteGroup(req.params.id)
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

    function findGroupsByUser(req, res) {
        userModel
            .findUserById(req.params.id)
            .then(function(user){
                groupModel
                    .findGroupsByIds(user.groups)
                    .then(
                        function(groups){
                            res.json(groups);
                        },
                        function(err){
                            res.status(400).send(err);
                        }
                    );}
                )};



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