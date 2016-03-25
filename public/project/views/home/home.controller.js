(function(){
    angular
        .module("PollyannaApp")
        .controller("HomeController", HomeController);
    function HomeController($scope) {
        $scope.homeWelcome = "Welcome !"
    }
})();