// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load group schema
    var GroupSchema = require("./group.schema.server.js")(mongoose);

    // create group model from schema
    var GroupModel = mongoose.model('Group', GroupSchema);

    var api = {
        createGroup: createGroup,
        findGroupById: findGroupById,
        findAllGroupsByUserId: findAllGroupsByUserId,
    };
    return api;


    function findAllGroupsByUserId (userId) {
        var deferred = q.defer();

        // find all groups for given user ID
        GroupModel.find({
            members: {$in: userId}
        }, function (err, groups) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(groups);
            }
        });

        return deferred.promise;
    }

    // use group model find by id
    function findGroupById(groupId) {
        var deferred = q.defer();
        GroupModel.findById(groupId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createGroup(group) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new group with mongoose group model's create()
        GroupModel.create(group, function (err, doc) {

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
