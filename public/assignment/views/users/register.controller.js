"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService) {

        $scope.register = register;

        function register(newUser) {
            function callback(object) {
                return object;
            }
            $rootScope.user = newUser;
            UserService.createUser(newUser, callback)
            $scope.$location = "/profile";
        }

    }
})();