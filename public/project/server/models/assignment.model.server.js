// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load assignment schema
    var AssignmentSchema = require("./assignment.schema.server.js")(mongoose);

    // create assignment model from schema
    var AssignmentModel = mongoose.model('Assignment', AssignmentSchema);

    var api = {
        createAssignment: createAssignment,
        findAssignmentById: findAssignmentById,
        findAllAssignmentsByUserId: findAllAssignmentsByUserId,
        findAllAssignmentsByGroupId: findAllAssignmentsByGroupId
    };
    return api;

    function findAllAssignmentsByGroupId (groupId) {
        var deferred = q.defer();

        // find all assignment for given group ID
        AssignmentModel.find({
            group: {$in: groupId}
        }, function (err, invites) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(invites);
            }
        });

        return deferred.promise;
    }

    function findAllAssignmentsByUserId (userId) {
        var deferred = q.defer();

        // find all assignments for given of user ID
        AssignmentModel.find({
            giver: {$in: userId}
        }, function (err, invites) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(invites);
            }
        });

        return deferred.promise;
    }

    // use assignment model find by id
    function findAssignmentById(assignmentId) {
        var deferred = q.defer();
        AssignmentModel.findById(assignmentId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createAssignment(assignment) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new invite with mongoose assignment model's create()
        AssignmentModel.create(assignment, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

}
