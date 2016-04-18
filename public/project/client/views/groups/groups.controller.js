"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("GroupsController", GroupsController);

    function GroupsController(GroupService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        

        function init() {
            GroupService
                .findGroupsByIds(vm.currentUser.groups)
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