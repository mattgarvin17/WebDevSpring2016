(function(){
    angular
        .module("PollyannaApp")
        .controller("GroupDetailsController", groupDetailsController);

    function groupDetailsController(AssignmentService, InviteService, UserService, GroupService, $routeParams, $rootScope, $location) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.leaderMode = null;
        vm.group = null;
        vm.assignmentErrorMessage = null;
        vm.leaveGroup = leaveGroup;
        vm.deleteGroup = deleteGroup;
        vm.updateGroup = updateGroup;
        vm.inviteUser = inviteUser;
        vm.generateAssignments = generateAssignments;
        var id = $routeParams.groupID;
        
        console.log(id);

        function init() {
            $rootScope.errorMessage = null;
            GroupService
                .findGroupById(id)
                .then(function (response) {
                    vm.group = response.data;
                    var newGroup = angular.copy(vm.group);
                    newGroup.eventDate = new Date(newGroup.eventDate);
                    vm.newGroup = newGroup;
                    console.log(vm.group);
                    UserService
                        .findUsersByGroup(vm.group._id)
                        .then(function (response) {
                            vm.users = response.data;
                            console.log(vm.users);
                        });
                    console.log(vm.currentUser._id);
                    console.log(vm.group.groupLeaderID);
                    if (vm.currentUser._id == vm.group.groupLeaderID) {
                        vm.leaderMode = true;
                    }
                });
        }
        init();

        // Fisher-Yates shuffle algorithm, found online
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        function getUserName(user) {
            return user.firstName + " " + user.lastName;
        }

        function generateAssignments() {
            AssignmentService
                .findAssignmentsByGroupId(vm.group._id)
                .then(function(response) {
                    console.log(response.data);
                    if (response.data.length) {
                        vm.assignmentErrorMessage = "You've already created assignments for this group!"
                    }
                    else {
                        console.log("generating assignments");
                        if ((vm.group.members.length) < 3) {
                            vm.assignmentErrorMessage = "You need at least 3 members to generate assignments. Invite some more!"
                        }
                        else {
                            var givers = vm.group.members.slice();
                            shuffle(givers);
                            UserService
                                .findUsersByIds(givers)
                                .then(function(response) {
                                    var users = response.data;
                                    var giverNames = users.map(getUserName);
                                    console.log(givers);
                                    console.log(giverNames);
                                    var len = givers.length;
                                    var receivers = [];
                                    var receiverNames = [];
                                    for (i = 0; i < len; i++) {
                                        receivers.push(givers[((i + 1) % len)]);
                                        receiverNames.push(giverNames[((i + 1) % len)]);
                                    }
                                    console.log(receivers);
                                    console.log(receiverNames);
                                    for (j = 0; j < len; j++) {
                                        var assignment = {};
                                        assignment.groupID = vm.group._id;
                                        assignment.groupName = vm.group.groupName;
                                        assignment.giverID = givers[j];
                                        assignment.giverName = giverNames[j];
                                        console.log(assignment.giverName);
                                        assignment.receiverID = receivers[j];
                                        assignment.receiverName = receiverNames[j];
                                        console.log(assignment.receiverName);
                                        AssignmentService
                                            .createAssignment(assignment);
                                        // do I need to handle the result of this call?
                                    }
                                })
                        }
                    }
                });
        }
        
        

        function leaveGroup() {
            var index = vm.currentUser.groups.indexOf(vm.group._id);
            var newUser = angular.copy(vm.currentUser);
            newUser.groups = newUser.groups.splice(1, index);
            UserService
                .updateUser(vm.currentUser._id, newUser)
                .then(function (response) {
                    $location.url("/groups");
                });
        }

        function updateGroup(group) {
            var newGroup = {};
            var today = new Date();
            console.log(today);
            console.log(group.eventDate);
            if (group.groupName) {
                if (group.eventDate > today) {
                    if (group.priceRange) {
                        newGroup.groupName = group.groupName;
                        newGroup.groupLeaderID = vm.currentUser._id;
                        newGroup.groupLeaderName = vm.currentUser.firstName + " " + vm.currentUser.lastName;
                        newGroup.members = [vm.currentUser._id];
                        newGroup.eventDate = group.eventDate;
                        newGroup.priceRange = group.priceRange;
                        GroupService
                            .updateGroup(group._id, newGroup)
                            .then(
                                function (response) {
                                    var res = response.data;
                                    if (res != null) {
                                        location.reload();
                                    }
                                    else {
                                        $rootScope.errorMessage = "There was a problem updating your group."
                                    }

                                },
                                function (err) {
                                    vm.error = err;
                                }
                            );
                    }
                    else {
                        $rootScope.errorMessage = "You must enter a price range for your group.";
                    }
                }
                else {
                    $rootScope.errorMessage = "This site does not condone time travel. Please choose a date in the future.";
                }
            }
            else {
                $rootScope.errorMessage = "You must enter a name for your group.";
            }
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
                    $location.url("/groups");
                });
        }

        function inviteUser() {
            console.log(vm.invitedEmail);
            UserService
                .findUserByEmail(vm.invitedEmail)
                .then(function (response) {
                        vm.invitedUser = response.data;
                    
                    if (!vm.invitedUser) {
                        $rootScope.errorMessage = "No user found with that email address."
                    }
                    else {
                        $rootScope.errorMessage = null;
                        vm.invitedEmail = null;
                        var newInvite = {};
                        newInvite.senderID = vm.currentUser._id;
                        newInvite.senderName = vm.currentUser.firstName + " " + vm.currentUser.lastName;
                        newInvite.receiverID = vm.invitedUser._id;
                        newInvite.receiverName = vm.invitedUser.firstName + " " + vm.invitedUser.lastName;
                        newInvite.groupID = vm.group._id;
                        newInvite.groupName = vm.group.groupName;
                        InviteService
                            .createInvite(newInvite)
                            .then(function(response) {
                                var success = response.data;
                                if (!success) {
                                    $rootScope.errorMessage = "This user is already invited!"
                                }
                                else {
                                    console.log(newInvite);
                                }
                            });
                    }
                });

        }
    }
})();