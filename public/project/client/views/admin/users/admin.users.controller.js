
(function()
{
    angular
        .module("PollyannaApp")
        .controller("AdminUsersController", adminUsersController);

    function adminUsersController(UserService, $rootScope)
    {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;

        vm.createUser = createUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function removeUser(user)
        {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function updateUser(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function createUser(user)
        {
            console.log(user);
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function selectUser(user)
        {
            vm.user = angular.copy(user);
        }

        function handleSuccess(response) {
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();