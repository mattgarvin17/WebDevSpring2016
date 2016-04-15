"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        $scope.currentUser = $rootScope.user;
        $scope.update = update;

        function update(user) {
            function callback(object) {
                return object;
            }
            UserService.updateUser($scope.currentUser._id, user, callback)
        }


    }
})();