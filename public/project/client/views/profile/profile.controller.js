(function(){
    angular
        .module("PollyannaApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location, $routeParams) {
        var vm = this;
        
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
