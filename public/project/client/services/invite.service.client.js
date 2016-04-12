(function(){
    angular
        .module("PollyannaApp")
        .factory("InviteService", inviteService);

    function inviteService($http, $rootScope) {
        var api = {
            newInvite: newInvite,
            getInvite: getInvite,
            getAllInvitesByUserId: getAllInvitesByUserId

        };
        return api;

        function newInvite(invite) {
            return $http.post("/api/pollyanna/newInvite", invite);
        }

        function getInvite(inviteId) {
            return $http.get("/api/pollyanna/invite/"+inviteId)
        }

        function getAllInvitesByUserId() {
            return $http.get("/api/pollyanna/user/"+$rootScope.currentUser._id+"/invites")
        }

    }
})();
