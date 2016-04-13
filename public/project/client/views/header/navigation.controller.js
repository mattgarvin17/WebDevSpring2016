
(function(){
    angular
        .module("PollyannaApp")
        .controller("NavigationController", navigationController);

    function navigationController($location, UserService, $rootScope) {
        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }
})();
