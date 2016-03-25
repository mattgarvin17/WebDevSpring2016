(function()
{
    angular
        .module("GroupsApp")
        .controller("GroupsController", GroupsController);

    function GroupsController($scope)
    {
        $scope.groups = [
            {leaderEmail:"lleadman45@gmail.com", date:"12/28/2016", range:"$35-$50", users:"3"}
        ];

        $scope.addGroup = addGroup;
        $scope.removeGroup = removeGroup;
        $scope.selectGroup = selectGroup;
        $scope.updateGroup = updateGroup;

        function updateGroup(group)
        {
            $scope.groups[$scope.selectedGroupIndex] = {
                leaderEmail: group.leaderEmail,
                date: group.date,
                range: group.range,
                users: group.users
            };
        }

        function selectGroup(index)
        {
            $scope.selectedGroupIndex = index;
            $scope.group = {
                leaderEmail: $scope.groups[index].leaderEmail,
                date: $scope.groups[index].date,
                range: $scope.groups[index].range,
                users: $scope.groups[index].users
            };
        }

        function removeGroup(group)
        {
            var index = $scope.groups.indexOf(group);
            $scope.groups.splice(index, 1);
        }

        function addGroup(group)
        {
            var newGroup = {
                leaderEmail: group.leaderEmail,
                date: group.date,
                range: group.range,
                users: group.users
            };
            $scope.groups.push(newGroup);
        }
    }
})();
