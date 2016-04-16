module.exports = function(mongoose) {

    // use mongoose to declare a group schema
    var InviteSchema = mongoose.Schema({
        // userID of group leader
        fromUser: String,
        // userID of invited user
        toUser: String,
        // groupID of group user is invited to
        forGroup: String

    }, {collection: 'pollyanna.invite'});

    return InviteSchema;

};

