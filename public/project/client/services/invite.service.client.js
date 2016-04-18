(function(){
    angular
        .module("PollyannaApp")
        .factory("InviteService", inviteService);

    function inviteService($http, $rootScope) {
        var api = {
            createInvite: createInvite,
            updateInvite: updateInvite,
            deleteInvite: deleteInvite,
            findAllInvites: findAllInvites,
            findInviteById: findInviteById,
            findInvitesByGroupId: findInvitesByGroupId,
            findInvitesByReceiverId: findInvitesByReceiverId

        };
        return api;

        function createInvite(invite) {
            return $http.post("/api/pollyanna/invite", invite);
        }

        function updateInvite(inviteID, invite) {
            return $http.put("/api/pollyanna/invite/"+inviteID, invite);
        }

        function deleteInvite(inviteID) {
            return $http.delete("/api/pollyanna/invite/"+inviteID);
        }

        function findAllInvites() {
            return $http.get("/api/pollyanna/invite");
        }

        function findInviteById(inviteID) {
            return $http.get("/api/pollyanna/invite/"+inviteID);
        }

        function findInvitesByGroupId(groupID) {
            return $http.get("/api/pollyanna/invite/group/"+groupID);
        }

        function findInvitesByReceiverId(receiverID) {
            return $http.get("/api/pollyanna/invite/receiver/"+receiverID);
        }

    }
})();