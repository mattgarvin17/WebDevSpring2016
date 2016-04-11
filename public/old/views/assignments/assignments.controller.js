(function()
{
    angular
        .module("PollyannaApp")
        .controller("AssignmentsController", AssignmentsController);

    function AssignmentsController($scope)
    {
        $scope.assignments = [
            {email:"bobboberson@gmail.com", assignmentEmail:"guymcguy12@gmail.com", leaderEmail:"lleadman45@gmail.com"},
            {email:"guymcguy12@gmail.com", assignmentEmail:"lleadman45@gmail.com", leaderEmail:"lleadman45@gmail.com"},
            {email:"lleadman45@gmail.com", assignmentEmail:"bobboberson@gmail.com", leaderEmail:"lleadman45@gmail.com"}
        ];

        $scope.addAssignment = addAssignment;
        $scope.removeAssignment = removeAssignment;
        $scope.selectAssignment = selectAssignment;
        $scope.updateAssignment = updateAssignment;

        function updateAssignment(assignment)
        {
            $scope.assignments[$scope.selectedAssignmentIndex] = {
                email: assignment.email,
                assignmentEmail: assignment.assignmentEmail,
                leaderEmail: assignment.leaderEmail
            };
        }

        function selectAssignment(index)
        {
            $scope.selectedAssignmentIndex = index;
            $scope.assignment = {
                email: $scope.assignments[index].email,
                assignmentEmail: $scope.assignments[index].assignmentEmail,
                leaderEmail: $scope.assignments[index].leaderEmail
            };
        }

        function removeAssignment(assignment)
        {
            var index = $scope.assignments.indexOf(assignment);
            $scope.assignments.splice(index, 1);
        }

        function addAssignment(assignment)
        {
            var newAssignment = {
                email: assignment.email,
                assignmentEmail: assignment.assignmentEmail,
                leaderEmail: assignment.leaderEmail
            };
            $scope.assignments.push(newAssignment);
        }
    }
})();
