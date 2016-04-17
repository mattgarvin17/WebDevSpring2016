module.exports = function(mongoose) {

    // use mongoose to declare a group schema
    var AssignmentSchema = mongoose.Schema({
        // groupID of associated group
        groupID: String,
        groupName: String,
        // userID of giver
        giverID: String,
        giverName: String,
        // userID of receiver
        receiverID: String,
        receiverName: String
        

    }, {collection: 'pollyanna.assignment'});

    return AssignmentSchema;

};

