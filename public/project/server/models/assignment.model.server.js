var mongoose      = require("mongoose");

module.exports = function() {

    // load assignment schema
    var AssignmentSchema = require("./assignment.schema.server.js")(mongoose);

    // create assignment model from schema
    var AssignmentModel = mongoose.model('Assignment', AssignmentSchema);

    var api = {
        createAssignment: createAssignment,
        updateAssignment: updateAssignment,
        deleteAssignment: deleteAssignment,
        findAllAssignments: findAllAssignments,
        findAssignmentById: findAssignmentById,
        findAllAssignmentsByGroupId: findAllAssignmentsByGroupId,
        findAllAssignmentsByGiverId: findAllAssignmentsByGiverId,
        findAssignmentByGroupAndReceiver: findAssignmentByGroupAndReceiver
    };
    return api;

    function createAssignment(assignment) {
        return AssignmentModel.create(assignment);
    }

    function updateAssignment(assignmentID, assignment) {
        return AssignmentModel.update({_id: assignmentID}, {$set: assignment});
    }

    function deleteAssignment(assignmentID) {
        return AssignmentModel.remove({_id: assignmentID});
    }

    function findAllAssignments() {
        return AssignmentModel.find();
    }

    function findAssignmentById(assignmentID) {
        return AssignmentModel.findById(assignmentID)
    }

    function findAllAssignmentsByGroupId(groupID) {
        return AssignmentModel.find({groupID: groupID})
    }

    function findAllAssignmentsByGiverId(giverID) {
        return AssignmentModel.find({giverID: giverID})
    }

    function findAssignmentByGroupAndReceiver(groupID, receiverID) {
        return AssignmentModel.findOne(
            {
                groupID: groupID,
                receiverID: receiverID
            }
        );
    }
    
}
