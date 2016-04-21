"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("AdminInvitesController", adminInvitesController);

    function adminInvitesController(InviteService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        vm.createInvite = createInvite;
        vm.removeInvite = removeInvite;
        vm.selectInvite = selectInvite;
        vm.updateInvite = updateInvite;

        function init() {
            InviteService
                .findAllInvites()
                .then(handleSuccess, handleError);
        }
        init();

        function removeInvite(invite)
        {
            InviteService
                .deleteInvite(invite._id)
                .then(handleSuccess, handleError);
        }

        function updateInvite(invite)
        {
            var newInvite = {};
            newInvite.senderID = invite.senderID;
            newInvite.senderName = invite.senderName;
            newInvite.receiverID = invite.receiverID;
            newInvite.receiverName = invite.receiverName;
            newInvite.groupID = invite.groupID;
            newInvite.groupName = invite.groupName;
            InviteService
                .updateInvite(invite._id, newInvite)
                .then(handleSuccess, handleError);
            vm.invite = null;
        }

        function createInvite(invite)
        {
            InviteService
                .createInvite(invite)
                .then(handleSuccess, handleError);
            vm.invite = null;
        }

        function selectInvite(invite)
        {
            vm.invite = angular.copy(invite);
        }

        function handleSuccess(response) {
            vm.invites = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();
