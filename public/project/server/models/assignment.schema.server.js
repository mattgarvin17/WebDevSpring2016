module.exports = function(mongoose) {

    // use mongoose to declare a group schema
    var AssignmentSchema = mongoose.Schema({
        _id: String,
        // groupID of associated group
        group: String,
        // userID of giver
        giver: String,
        // userID of receiver
        receiver: String

    }, {collection: 'pollyanna.assignment'});

    return AssignmentSchema;

};

