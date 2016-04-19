"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("AdminGroupsController", adminGroupsController);

    function adminGroupsController(GroupService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        vm.createGroup = createGroup;
        vm.removeGroup = removeGroup;
        vm.selectGroup = selectGroup;
        vm.updateGroup = updateGroup;

        function init() {
            GroupService
                .findAllGroups()
                .then(handleSuccess, handleError);
        }
        init();

        function removeGroup(group)
        {
            GroupService
                .deleteGroup(group._id)
                .then(handleSuccess, handleError);
        }

        function updateGroup(group)
        {
            GroupService
                .updateGroup(group._id, group)
                .then(handleSuccess, handleError);
            vm.group = null;
        }

        function createGroup(group)
        {
            GroupService
                .createGroup(group)
                .then(handleSuccess, handleError);
            vm.group = null;
        }

        function selectGroup(group)
        {
            vm.group = angular.copy(group);
        }

        function handleSuccess(response) {
            vm.groups = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();