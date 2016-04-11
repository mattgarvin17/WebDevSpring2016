// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load invite schema
    var InviteSchema = require("./invite.schema.server.js")(mongoose);

    // create invite model from schema
    var InviteModel = mongoose.model('Invite', InviteSchema);

    var api = {
        createInvite: createInvite,
        findInviteById: findInviteById,
        findAllInvitesByUserId: findAllInvitesByUserId,
    };
    return api;


    function findAllInvitesByUserId (userId) {
        var deferred = q.defer();

        // find all invites for given user ID
        InviteModel.find({
            to: {$in: userId}
        }, function (err, invites) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(invites);
            }
        });

        return deferred.promise;
    }

    // use invite model find by id
    function findInviteById(inviteId) {
        var deferred = q.defer();
        InviteModel.findById(inviteId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createInvite(invite) {

        // use q to defer the response
        var deferred = q.defer();

        // insert new invite with mongoose invite model's create()
        InviteModel.create(invite, function (err, doc) {

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
