module.exports = function(mongoose) {

    // use mongoose to declare a group schema
    var GroupSchema = mongoose.Schema({
        groupName: String,
        // userID of leader
        groupLeaderID: String,
        groupLeaderName: String,
        // list of userID's
        members: [String],
        eventDate: String,
        priceRange: String

    }, {collection: 'pollyanna.group'});

    return GroupSchema;

};
