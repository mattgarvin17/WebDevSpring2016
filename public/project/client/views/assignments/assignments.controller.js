(function()
{
    angular
        .module("PollyannaApp")
        .controller("AssignmentsController", assignmentsController);

    function assignmentsController(AssignmentService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        

        function init() {
            AssignmentService
                .findAssignmentsByGiverId(vm.currentUser._id)
                .then(handleSuccess, handleError);
        }
        init();
        
        function handleSuccess(response) {
            vm.assignments = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();