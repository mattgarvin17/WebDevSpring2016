"use strict";

(function()
{
    angular
        .module("PollyannaApp")
        .controller("AdminAssignmentsController", AdminAssignmentsController);

    function AdminAssignmentsController(AssignmentService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        vm.createAssignment = createAssignment;
        vm.removeAssignment = removeAssignment;
        vm.selectAssignment = selectAssignment;
        vm.updateAssignment = updateAssignment;

        function init() {
            AssignmentService
                .findAllAssignments()
                .then(handleSuccess, handleError);
        }
        init();

        function removeAssignment(assignment)
        {
            AssignmentService
                .deleteAssignment(assignment._id)
                .then(handleSuccess, handleError);
        }

        function updateAssignment(assignment)
        {
            AssignmentService
                .updateAssignment(assignment._id, assignment)
                .then(handleSuccess, handleError);
        }

        function createAssignment(assignment)
        {
            AssignmentService
                .createAssignment(assignment)
                .then(handleSuccess, handleError);
        }

        function selectAssignment(assignment)
        {
            vm.assignment = angular.copy(assignment);
        }

        function handleSuccess(response) {
            vm.assignments = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();