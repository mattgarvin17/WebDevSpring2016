var mongoose = require('mongoose');

module.exports = function(app, assignmentModel) {
    
    app.post("/api/pollyanna/assignment", createAssignment); 
    app.put("/api/pollyanna/assignment/:id", updateAssignment);
    app.delete("/api/pollyanna/assignment/:id", deleteAssignment);
    app.get("/api/pollyanna/assignment", findAllAssignments);
    app.get("/api/pollyanna/assignment/:id", findAssignmentById);
    app.get("/api/pollyanna/assignment/group/:groupID", findAllAssignmentsByGroupId);
    app.get("/api/pollyanna/assignment/giver/:giverID", findAllAssignmentsByGiverId);

    function createAssignment(req, res) {
        var newAssignment = req.body;
        assignmentModel.createAssignment(newAssignment)
            .then(
                function (assignment) {
                    return assignmentModel.findAllAssignments();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (assignments) {
                    res.json(assignments);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    /*
    // version of create assignment that would ensure no duplicated assignments, something is wrong with it
    function createAssignment(req, res) {
        var newAssignment = req.body;

        assignmentModel.findAssignmentByGroupAndReceiver(newAssignment.groupID, newAssignment.receiverID)
            .then(
                function(assignment) {
                    if (!assignment) {
                        res.json(null);
                    }
                    else {
                        assignmentModel.createAssignment(newAssignment)
                            .then(
                                function(assignment){
                                    return assignmentModel.findAllAssignments();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            )
                            .then(
                                function(assignments){
                                    res.json(assignments);
                                },
                                function(err){
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
    */

    function updateAssignment(req, res) {
        var newAssignment = req.body;
        
        assignmentModel.updateAssignment(req.params.id, newAssignment)
            .then(
            function(assignment){
                return assignmentModel.findAllAssignments();
            },
            function(err){
                res.status(400).send(err);
            }
            )
            .then(
                function(assignments){
                    res.json(assignments);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
        
    }
    
    function deleteAssignment(req, res) {
        assignmentModel
            .deleteAssignment(req.params.id)
            .then(
                function(assignment){
                    return assignmentModel.findAllAssignments();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(assignments){
                    res.json(assignments);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    
    function findAllAssignments(req, res) {
        assignmentModel.findAllAssignments()
            .then(
                function(assignments){
                    res.json(assignments);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    
    function findAssignmentById(req, res) {
        assignmentModel.findAssignmentById(req.params.id)
            .then(
                function(assignment){
                    res.json(assignment);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllAssignmentsByGroupId(req, res) {
        assignmentModel.findAllAssignmentsByGroupId(req.params.groupID)
            .then(
                function(assignments){
                    res.json(assignments);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllAssignmentsByGiverId(req, res) {
        assignmentModel.findAllAssignmentsByGiverId(req.params.giverID)
            .then(
                function(assignments){
                    res.json(assignments);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
}
