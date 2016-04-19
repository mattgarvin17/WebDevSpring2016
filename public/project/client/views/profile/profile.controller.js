(function(){
    angular
        .module("PollyannaApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService, $location) {
        var vm = this;
        var newUser = {};
        vm.updateUser = updateUser;
        vm.currentUser = $rootScope.currentUser;
        vm.user = angular.copy($rootScope.currentUser);
        vm.user.password2 = vm.user.password;

        function init() {

        }

        init();

        function updateUser(user) {
            if (!user || !user.email) {
                $rootScope.errorMessage = "Email address is invalid.";
            }
            else {
                if (!user.password || !user.password2 || user.password.length < 1 || user.password2 < 1) {
                    $rootScope.errorMessage = "You must enter a password.";
                }
                else {
                    if (user.password == user.password2) {
                        if (user.firstName && user.lastName) {
                            newUser.roles = ['standard'];
                            newUser.email = user.email;
                            newUser.password = user.password;
                            newUser.firstName = user.firstName;
                            newUser.lastName = user.lastName;

                            UserService
                                .updateUser(vm.currentUser._id, newUser)
                                .then(
                                    function (response) {
                                        var user = response.data;
                                        if (user != null) {
                                            $rootScope.currentUser = user;
                                            location.reload();
                                        }
                                    },
                                    function (err) {
                                        vm.error = err;
                                    });
                        }
                        else {
                            $rootScope.errorMessage = "You must enter a first and last name.";
                        }
                    }
                    else {
                        $rootScope.errorMessage = "Passwords do not match.";
                    }
                }
            }

        }
    }

})();
