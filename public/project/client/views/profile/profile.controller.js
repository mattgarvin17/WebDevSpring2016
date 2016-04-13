(function(){
    angular
        .module("PollyannaApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location, $routeParams, $rootScope) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        // using email as username
        //var username = $routeParams.email;
        //console.log(username);

        //function init() {
        //    UserService
        //        .getProfile()
        //        .then(function (response) {
        //            vm.profile = response.data;
        //            console.log(vm.profile);
        //        });
        //}
        //return init();
    }
})();
