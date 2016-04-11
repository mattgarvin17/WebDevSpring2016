(function()
{
    angular
        .module("UsersApp")
        .controller("UsersController", UsersController);

    function UsersController($scope)
    {
        $scope.users = [
            {firstName: "Bob", lastName: "Bobson", role: ["Participant"], email: "bobboberson@gmail.com"},
            {firstName: "Guy", lastName: "McGuy", role: ["Participant"], email: "guymcguy12@gmail.com"},
            {firstName: "Larry", lastName: "Leadman", role: ["Participant", "Leader"], email: "lleadman45@gmail.com"}
        ];

        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        function updateUser(user)
        {
            $scope.users[$scope.selectedUserIndex] = {
                firstName: user.firstName,
                lastName:  user.lastName,
                role:      user.role,
                email:     user.email
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