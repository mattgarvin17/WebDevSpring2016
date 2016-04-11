module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        roles: [String],
        //groups: [GroupSchema],
        //gifts: [GiftSchema],
        //assignments: [AssignmentSchema],
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.pollyanna.user'});
    return UserSchema;
};
