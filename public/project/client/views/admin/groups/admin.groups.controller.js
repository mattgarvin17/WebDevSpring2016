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
            var newGroup = {};
            newGroup.groupName = group.groupName;
            newGroup.groupLeaderID = group.groupLeaderID;
            newGroup.groupLeaderName = group.groupLeaderName;
            newGroup.members = group.members;
            newGroup.priceRange = group.priceRange;
            newGroup.eventDate = group.eventDate;
            GroupService
                .updateGroup(group._id, newGroup)
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
            var newGroup = angular.copy(group);
            newGroup.eventDate = new Date(newGroup.eventDate);
            vm.group = newGroup;
        }

        function handleSuccess(response) {
            vm.groups = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();