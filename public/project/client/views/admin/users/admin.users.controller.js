(function()
{
    angular
        .module("PollyannaApp")
        .controller("UsersController", UsersController);

    function UsersController(UserService, $rootScope, $location)
    {
        var vm = this;

        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        function updateUser(user)
        {
            vm.users[vm.selectedUserIndex] = {
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                email: user.email,
                password: user.password
            };
        }

        function selectUser(index)
        {
            $scope.selectedUserIndex = index;
            $scope.user = {
                firstName: $scope.users[index].firstName,
                lastName: $scope.users[index].lastName,
                role: $scope.users[index].role,
                email: $scope.users[index].email
            };
        }

        function removeUser(user)
        {
            var index = $scope.users.indexOf(user);
            $scope.users.splice(index, 1);
        }

        function addUser(user)
        {
            var newUser = {
                firstName: user.firstName,
                lastName:  user.lastName,
                role:      user.role,
                email:     user.email
            };
            $scope.users.push(newUser);
        }
    }
})();