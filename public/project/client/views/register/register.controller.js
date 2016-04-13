(function(){
    angular
        .module("PollyannaApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            if (user.password == user.password2) {
                user.roles = ['standard'];
                user.groups = [];
                user.gifts = [];
                user.assignments = [];
                delete user.password2;
                UserService
                    .register(user)
                    .then(function (response) {
                        var currentUser = response.data;
                        if (currentUser != null) {
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }
                    });
            }
            else {
                $rootScope.errorMessage = "Passwords do not match.";
            }
        }
    }
})();