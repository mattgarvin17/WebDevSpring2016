module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        //_id: String,
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        roles: [String],
        // list of groupIDs user is a part of
        groups: [String],
        // list of giftIDs belonging to user
        gifts: [String],
        // list of assignments for which user is giver
        assignments: [String]

    }, {collection: 'pollyanna.user'});
    return UserSchema;
};
