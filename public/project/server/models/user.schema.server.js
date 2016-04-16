module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        roles: [String],

    }, {collection: 'pollyanna.user'});
    return UserSchema;
};
