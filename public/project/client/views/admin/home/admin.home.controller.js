(function(){
    angular
        .module("PollyannaApp")
        .controller("AdminHomeController", adminHomeController);

    function adminHomeController($rootScope) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
    }
})();
