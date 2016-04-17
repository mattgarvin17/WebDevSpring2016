var mongoose      = require("mongoose");

module.exports = function() {

    // load invite schema
    var InviteSchema = require("./invite.schema.server.js")(mongoose);

    // create invite model from schema
    var InviteModel = mongoose.model('Invite', InviteSchema);

    var api = {
        createInvite: createInvite,
        updateInvite: updateInvite,
        deleteInvite: deleteInvite,
        findAllInvites: findAllInvites,
        findInviteById: findInviteById,
        findAllInvitesByGroupId: findAllInvitesByGroupId,
        findAllInvitesByReceiverId: findAllInvitesByReceiverId,
        findInviteByGroupAndReceiver: findInviteByGroupAndReceiver
    };
    return api;

    function createInvite(invite) {
        return InviteModel.create(invite);
    }

    function updateInvite(inviteID, invite) {
        return InviteModel.update({_id: inviteID}, {$set: invite});
    }

    function deleteInvite(inviteID) {
        return InviteModel.remove({_id: inviteID});
    }

    function findAllInvites() {
        return InviteModel.find();
    }

    function findInviteById(inviteID) {
        return InviteModel.findById(inviteID)
    }

    function findAllInvitesByGroupId(groupID) {
        return InviteModel.find({groupID: groupID})
    }

    function findAllInvitesByReceiverId(receiverID) {
        return InviteModel.find({receiverID: receiverID})
    }
    
    function findInviteByGroupAndReceiver(groupID, receiverID) {
        return InviteModel.findOne(
            {
                groupID: groupID,
                receiverID: receiverID
            }
        );
    }
}
