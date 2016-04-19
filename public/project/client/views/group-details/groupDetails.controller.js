(function(){
    angular
        .module("PollyannaApp")
        .controller("GroupDetailsController", groupDetailsController);

    function groupDetailsController(InviteService, UserService, GroupService, $routeParams, $rootScope, $location) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.leaderMode = null;
        vm.invitedEmail = null;
        vm.leaveGroup = leaveGroup;
        vm.deleteGroup = deleteGroup;
        vm.updateGroup = updateGroup;
        vm.inviteUser = inviteUser;
        var id = $routeParams.groupID;
        
        console.log(id);

        function init() {
            $rootScope.errorMessage = null;
            GroupService
                .findGroupById(id)
                .then(function (response) {
                    vm.group = response.data;
                    vm.newGroup = angular.copy(vm.group);
                    console.log(vm.group);
                });
            UserService
                .findUsersByIds(vm.group.members)
                .then(function (response) {
                    vm.users = response.data;
                    console.log(vm.users);
                });
            if (vm.currentUser._id == vm.group.groupLeaderID) {
                vm.leaderMode = true;
            }
        }
        init();

        function leaveGroup() {
            var index = vm.currentUser.groups.indexOf(vm.group._id);
            vm.currentUser.groups.splice(1, index);
            UserService
                .updateUser(vm.currentUser._id, vm.currentUser)
                .then(function (response) {
                    $location = "/groups";
                });
        }

        function updateGroup(group) {
            GroupService
                .updateGroup(vm.group._id, group)
                .then(function (response) {
                    $location = "/groups";
                });
        }

        function deleteGroup() {
            // eventually need to add some way to iterate through all users in members and remove group
            // from their list. for now, they'll just retain the id even though searching the database will return null
            GroupService
                .deleteGroup(vm.group._id)
                .then(function (response) {
                    $location = "/groups";
                });
        }

        function inviteUser() {
            UserService
                .findUserByEmail(vm.invitedEmail)
                .then(function (response) {
                    vm.invitedUser = response.data;
                    if (!vm.invitedUser) {
                        $rootScope.errorMessage = "No user found with that email address."
                    }
                });
            var newInvite = {};
            newInvite.senderID = vm.currentUser._id;
            newInvite.senderName = vm.currentUser.firstName + vm.currentUser.lastName;
            newInvite.receiverID = vm.invitedUser._id;
            newInvite.receiverName = vm.invitedUser.firstName + vm.invitedUser.lastName;
            newInvite.groupID = vm.group._id;
            newInvite.groupName = vm.group.groupName;
            InviteService
                .createInvite(newInvite)
                .then(function(response) {
                    success = response.data;
                    if (!success) {
                        $rootScope.errorMessage = "This user is already invited!"
                    }
                    else {
                        console.log(newInvite);
                    }
                });
        }
    }
})();