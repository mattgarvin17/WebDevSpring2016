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
            getProfile: getProfile,
            updateUser: updateUser
        };
        return api;

        function getProfile() {
            return $http.get("/api/pollyanna/profile/"+$rootScope.currentUser._id);
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
        
        function updateUser(user) {
            return $http.post("/api/pollyanna/updateUser", user);
        }
    }
})();
