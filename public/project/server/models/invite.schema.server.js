module.exports = function(mongoose) {

    // use mongoose to declare a group schema
    var InviteSchema = mongoose.Schema({
        // userID of group leader
        senderID: String,
        senderName: String,
        // userID of invited user
        receiverID: String,
        receiverName: String,
        // groupID of group user is invited to
        groupID: String,
        groupName: String

    }, {collection: 'pollyanna.invite'});

    return InviteSchema;

};

