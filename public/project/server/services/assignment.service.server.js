module.exports = function(app, assignmentModel) {
    app.post("/api/pollyanna/newAssignment", newAssignment);
    app.get("/api/pollyanna/user/:userId/assignments", allUserAssignments);
    app.get("/api/pollyanna/group/:groupId/assignments", allGroupAssignments);
    app.get("/api/pollyanna/assignment/:assignmentId", getAssignment);

    function newAssignment(req, res) {
        var assignment = req.body;

        assignment = assignmentModel.createAssignment(assignment)
            // handle model promise
            .then(
                // return group if promise resolved
                function (doc) {
                    assignment = doc;
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function allUserAssignments(req, res) {
        var userId = req.params.userId;
        var assignments = null;

        assignmentModel.findAllAssignmentsByUserId(userId)
            .then(
                function (doc) {
                    assignments = doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function allGroupAssignments(req, res) {
        var groupId = req.params.groupId;
        var assignments = null;

        assignmentModel.findAllAssignmentsByGroupId(groupId)
            .then(
                function (doc) {
                    assignments = doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getAssignment(req, res) {
        var assignmentId = req.params.assignmentId;
        var assignment = null;

        assignmentModel.findAssignmentById(assignmentId)
            .then(
                function (doc) {
                    assignment = doc;
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

}
