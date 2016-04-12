(function(){
    angular
        .module("PollyannaApp")
        .factory("AssignmentService", assignmentService);

    function assignmentService($http, $rootScope) {
        var api = {
            newAssignment: newAssignment,
            getAssignment: getAssignment,
            getAllAssignmentsByGroupId: getAllAssignmentsByGroupId,
            getAllAssignmentsByUserId: getAllAssignmentsByUserId

        };
        return api;

        function newAssignment(assignment) {
            return $http.post("/api/pollyanna/newAssignment", assignment);
        }

        function getAssignment(assignmentId) {
            return $http.get("/api/pollyanna/assignment/"+assignmentId)
        }

        function getAllAssignmentsByUserId() {
            return $http.get("/api/pollyanna/user/"+$rootScope.currentUser._id+"/assignments")
        }

        function getAllAssignmentsByGroupId(groupId) {
            return $http.get("/api/pollyanna/group/"+groupId+"/assignments")
        }

    }
})();
