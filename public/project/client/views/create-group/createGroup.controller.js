"use strict";

(function(){
    angular
        .module("PollyannaApp")
        .controller("CreateGroupController", createGroupController);

    function createGroupController(GroupService, $location, $rootScope) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.createGroup = createGroup;
        var newGroup = {};
        function init() {
            $rootScope.errorMessage = null;
        }
        init();

        function createGroup(group) {
            var today = new Date();
            console.log(today);
            console.log(group.eventDate);
            if (group.groupName) {
                if (group.eventDate > today) {
                    if (group.priceRange) {
                        newGroup.groupName = group.groupName;
                        newGroup.groupLeaderID = vm.currentUser._id;
                        newGroup.groupLeaderName = vm.currentUser.firstName + " " + vm.currentUser.lastName;
                        newGroup.members = [newGroup.groupLeaderID];
                        newGroup.eventDate = group.eventDate.toString();
                        newGroup.priceRange = group.priceRange;
                        GroupService
                            .createGroup(newGroup)
                            .then(
                                function (response) {
                                    var res = response.data;
                                    if (res != null) {
                                        $location.url("/groups");
                                    }
                                    else {
                                        $rootScope.errorMessage = "There was a problem creating your group."
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

        }
    }
})();