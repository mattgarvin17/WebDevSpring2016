"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("AdminInvitesController", AdminInvitesController);

    function AdminInvitesController(InviteService, $rootScope)
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
            InviteService
                .updateInvite(invite._id, invite)
                .then(handleSuccess, handleError);
        }

        function createInvite(invite)
        {
            InviteService
                .createInvite(invite)
                .then(handleSuccess, handleError);
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
