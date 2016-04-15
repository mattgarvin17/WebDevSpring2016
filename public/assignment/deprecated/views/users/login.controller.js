"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {

        $scope.login = login;

        function login(user) {
            function callback(object) {
                return object;
            }
            var currentUser;
            currentUser = UserService.findUserByCredentials(user.username, user.password, callback);
            if(currentUser != null) {
                $rootScope.user = user;
                $scope.$location = "/profile";
            }
        }
    }
})();