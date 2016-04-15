"use strict";
(function()
{
    angular.factory("UserService", []);

    function UserService($scope)
    {
        $scope.users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ]


        $scope.findUserByCredentials = findUserByCredentials;
        $scope.findAllUsers = findAllUsers;
        $scope.createUser = createUser;
        $scope.deleteUserById = deleteUserById;
        $scope.updateUser = updateUser;

        function findUserByCredentials(username, password, callback) {
            var userIndex;
            for (userIndex in $scope.users) {
                if (username == $scope.users[userIndex].username &&
                password == $scope.users[userIndex].password) {
                    callback($scope.users[userIndex])
                }
            }
            callback(null)
        }

        function findAllUsers(callback){
            var userIndex;
            for (userIndex in $scope.users) {
                callback($scope.users[userIndex])
            }
            callback(null)
        }

        function createUser(user, callback) {
            user._id = (new Date).getTime();
            $scope.users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            var userIndex;
            for (userIndex in $scope.users) {
                if (userId == $scope.users[userIndex]._id) {
                    $scope.users.splice(userIndex,1);
                }
            }
            callback($scope.users)
        }

        function updateUser(userId, user, callback) {
            var userIndex;
            for (userIndex in $scope.users) {
                if (userId == $scope.users[userIndex]._id) {
                    $scope.users[userIndex] = user;
                    callback($scope.users[userIndex]);
                }
            }
            callback(null)
        }

    }
})();
