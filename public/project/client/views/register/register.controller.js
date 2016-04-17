(function(){
    angular
        .module("PollyannaApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location, $rootScope) {
        var vm = this;
        vm.register = register;
        var newUser = {};
        function init() {

        }
        init();

        function register(user) {
            if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) && user.email) {
                if (user.password == user.password2 || !user.password || !user.password2) {
                    if (user.firstName && user.lastName) {
                        newUser.roles = ['standard'];
                        newUser.email = user.email;
                        newUser.password = user.password;
                        newUser.firstName = user.firstName;
                        newUser.lastName = user.lastName;
                        UserService
                            .register(newUser)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if (user != null) {
                                        $rootScope.currentUser = user;
                                        $location.url("/home");
                                    }
                                    else {
                                        $rootScope.errorMessage = "A user with that email address already exists."
                                    }

                                },
                                function (err) {
                                    vm.error = err;
                                }
                            );
                    }
                    else {
                        $rootScope.errorMessage = "You must enter a first and last name.";
                    }
                }
                else {
                    $rootScope.errorMessage = "Passwords do not match.";
                }
            }
            else {
                $rootScope.errorMessage = "Email address is invalid.";
            }

        }
    }
})();