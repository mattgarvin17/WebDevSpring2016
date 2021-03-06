"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("GroupsController", groupsController);

    function groupsController(GroupService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        

        function init() {
            GroupService
                .findGroupsByUser(vm.currentUser._id)
                .then(handleSuccess, handleError);
        }
        init();
        
        function handleSuccess(response) {
            vm.groups = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();