"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("InvitesController", invitesController);

    function invitesController(InviteService, GroupService, UserService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        vm.acceptInvite = acceptInvite;
        vm.declineInvite = declineInvite;


        function init() {
            InviteService
                .findAllInvitesByReceiverId(vm.currentUser._id)
                .then(handleSuccess, handleError);
        }
        init();

        function acceptInvite(invite)
        {
            vm.invite = invite;
            vm.user = angular.copy($rootScope.currentUser);
            vm.user.groups.push(invite.groupID);
            UserService
                .updateUser(vm.currentUser._id, vm.user)
                .then(handleUserSuccess, handleError)
        }

        function declineInvite(invite)
        {
            InviteService
                .deleteInvite(invite._id)
                .then(init, handleError);
        }
        
        function handleUserSuccess(response) {
            GroupService
                .findGroupById(invite.groupID)
                .then(handleGroupSuccess, handleError)
        }

        function handleGroupSuccess(response) {
            vm.group = response.data;
            vm.group.members.push(vm.currentUser._id);
            GroupService
                .updateGroup(vm.group._id, vm.group)
                .then(declineInvite(vm.invite), handleError)
        }

        function handleSuccess(response) {
            vm.invites = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();