var mongoose      = require("mongoose");

module.exports = function() {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        findUserByEmail: findUserByEmail
    };
    return api;


    function findUsersByIds(userIds) {
        return UserModel.find({
            '_id': { $in: userIds.ids.map(ObjectId)}
        });
    }

    // use user model find by id
    function findUserById(userId) {
        return UserModel.findById(ObjectId(userId))
    }

    // use user model find by email
    function findUserByEmail(email) {
        return UserModel.findOne({email: email});
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: ObjectId(userId)}, {$set: user});
    }

    function removeUser(userId) {
        return UserModel.remove({_id: ObjectId(userId)});
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                email: credentials.email,
                password: credentials.password
            }
        );
    }

}