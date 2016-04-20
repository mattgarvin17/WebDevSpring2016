(function(){
    angular
        .module("PollyannaApp")
        .controller("UserDetailsController", userDetailsController);

    function userDetailsController(UserService, GiftService, $routeParams, $rootScope, $location) {
        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        var id = $routeParams.userID;
        console.log(id);
        console.log(vm.currentUser._id)

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    delete vm.user.password;
                    console.log(vm.user);
                    GiftService
                        .findGiftsByUserId(id)
                        .then(function (response) {
                            vm.gifts = response.data;
                            console.log(vm.gifts);
                        });
                });
        }
        init();
    }
})();