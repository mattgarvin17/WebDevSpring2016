(function(){
    angular
        .module("PollyannaApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var api = {
            register: register,
            logout: logout,
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUsersByIds: findUsersByIds,
            findUserByEmail: findUserByEmail

        };
        return api;

        function findUserByEmail(userEmail) {
            return $http.get("/api/pollyanna/user/email", userEmail);
        }

        function findUsersByIds(userIDs) {
            return $http.get("/api/pollyanna/user/array", userIDs);
        }

        function findUserById(userID) {
            return $http.get("/api/pollyanna/user/"+userID);
        }
        
        function getCurrentUser() {
            return $http.get("/api/pollyanna/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function register(user) {
            return $http.post("/api/pollyanna/register", user);
        }

        function login(credentials) {
            return $http.post("/api/pollyanna/login", credentials);
        }

        function logout() {
            return $http.post("/api/pollyanna/logout");
        }

        function createUser(user) {
            return $http.post("/api/pollyanna/user", user);
        }
        
        function updateUser(userID, user) {
            return $http.put("/api/pollyanna/user/"+userID, user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/pollyanna/user/"+userId);
        }

        function findAllUsers() {
            return $http.get("/api/pollyanna/user");
        }
    }
})();
