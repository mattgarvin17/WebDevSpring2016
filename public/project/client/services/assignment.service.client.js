(function(){
    angular
        .module("PollyannaApp")
        .factory("AssignmentService", assignmentService);

    function assignmentService($http, $rootScope) {
        var api = {
            createAssignment: createAssignment,
            updateAssignment: updateAssignment,
            deleteAssignment: deleteAssignment,
            findAllAssignments: findAllAssignments,
            findAssignmentById: findAssignmentById,
            findAssignmentsByGroupId: findAssignmentsByGroupId,
            // there's no need for a find by receiver, it's meant to be a secret
            findAssignmentsByGiverId: findAssignmentsByGiverId

        };
        return api;

        function createAssignment(assignment) {
            return $http.post("/api/pollyanna/assignment", assignment);
        }
        
        function updateAssignment(assignmentID, assignment) {
            return $http.put("/api/pollyanna/assignment/"+assignmentID, assignment);
        }
        
        function deleteAssignment(assignmentID) {
            return $http.delete("/api/pollyanna/assignment/"+assignmentID);
        }
        
        function findAllAssignments() {
            return $http.get("/api/pollyanna/assignment");
        }
        
        function findAssignmentById(assignmentID) {
            return $http.get("/api/pollyanna/assignment/"+assignmentID);
        }
        
        function findAssignmentsByGroupId(groupID) {
            return $http.get("/api/pollyanna/assignment/group/"+groupID);
        }
        
        function findAssignmentsByGiverId(giverID) {
            return $http.get("/api/pollyanna/assignment/giver/"+giverID);
        }

    }
})();
