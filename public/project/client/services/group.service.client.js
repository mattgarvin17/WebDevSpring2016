(function(){
    angular
        .module("PollyannaApp")
        .factory("GroupService", groupService);

    function groupService($http, $rootScope) {
        var api = {
            newGroup: newGroup,
            getGroup: getGroup,
            getAllGroupsByUserId: getAllGroupsByUserId

        };
        return api;

        function newGroup(group) {
            return $http.post("/api/pollyanna/newGroup", group);
        }

        function getGroup(groupId) {
            return $http.get("/api/pollyanna/group/"+groupId)
        }

        function getAllGroupsByUserId() {
            return $http.get("/api/pollyanna/user/"+$rootScope.currentUser._id+"/groups")
        }

    }
})();
