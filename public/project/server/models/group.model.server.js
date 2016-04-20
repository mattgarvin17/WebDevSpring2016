var mongoose      = require("mongoose");

module.exports = function() {

    // load group schema
    var GroupSchema = require("./group.schema.server.js")(mongoose);

    // create group model from schema
    var GroupModel = mongoose.model('Group', GroupSchema);

    var api = {
        createGroup: createGroup,
        updateGroup: updateGroup,
        deleteGroup: deleteGroup,
        findAllGroups: findAllGroups,
        findGroupById: findGroupById,
        findGroupsByIds: findGroupsByIds,
        findAllGroupsByLeaderId: findAllGroupsByLeaderId
    };
    return api;

    function createGroup(group) {
        return GroupModel.create(group);
    }

    function updateGroup(groupID, group) {
        return GroupModel.update({_id: groupID}, {$set: group});
    }

    function deleteGroup(groupID) {
        return GroupModel.remove({_id: groupID});
    }

    function findAllGroups() {
        return GroupModel.find();
    }

    function findGroupById(groupID) {
        return GroupModel.findById(groupID);
    }

    function findGroupsByIds(groupIDs) {
        return GroupModel.find({
            '_id': { $in: groupIDs}
        });
    }

    function findAllGroupsByLeaderId(leaderID) {
        return GroupModel.find({groupLeader: leaderID});
    }

}
