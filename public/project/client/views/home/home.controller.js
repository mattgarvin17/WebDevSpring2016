(function(){
    angular
        .module("PollyannaApp")
        .controller("HomeController", homeController);

    function homeController($rootScope) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
    }
})();
