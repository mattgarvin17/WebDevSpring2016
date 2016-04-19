(function(){
    angular
        .module("PollyannaApp")
        .controller("UserDetailsController", userDetailsController);

    function userDetailsController(UserService, GiftService, $routeParams) {
        var vm = this;

        var id = $routeParams.userID;
        console.log(id);

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    delete vm.user.password;
                    console.log(vm.user);
                });
            GiftService
                .findAllGiftsByUserId(id)
                .then(function (response) {
                    vm.gifts = response.data;
                    console.log(vm.gifts);
                });
        }
        init();
    }
})();