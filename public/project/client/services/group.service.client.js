(function(){
    angular
        .module("PollyannaApp")
        .factory("GroupService", groupService);

    function groupService($http, $rootScope) {
        var api = {
            createGroup: createGroup,
            updateGroup: updateGroup,
            deleteGroup: deleteGroup,
            findAllGroups: findAllGroups,
            findGroupById: findGroupById,
            findGroupsByLeaderId: findGroupsByLeaderId,
            findGroupsByUser: findGroupsByUser

        };
        return api;

        function createGroup(group) {
            return $http.post("/api/pollyanna/group", group);
        }

        function updateGroup(groupID, group) {
            return $http.put("/api/pollyanna/group/"+groupID, group);
        }

        function deleteGroup(groupID) {
            return $http.delete("/api/pollyanna/group/"+groupID);
        }

        function findAllGroups() {
            return $http.get("/api/pollyanna/group");
        }

        function findGroupById(groupID) {
            return $http.get("/api/pollyanna/group/"+groupID);
        }

        function findGroupsByUser(userID) {
            return $http.get("/api/pollyanna/group/user/"+userID);
        }


        function findGroupsByLeaderId(leaderID) {
            return $http.get("/api/pollyanna/group/leader/"+leaderID);
        }

    }
})();
