(function(){
    angular
        .module("PollyannaApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService, $location) {
        var vm = this;
        var newUser = {}
        vm.updateUser = updateUser;
        vm.currentUser = $rootScope.currentUser;
        vm.user = angular.copy($rootScope.currentUser);
        vm.user.password2 = vm.user.password;

        function init() {

        }
        init();
        
        function updateUser(user) {
            console.log(user);
            if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) && user.email) {
                if (user.password == user.password2 || !user.password || !user.password2) {
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
                                        $location.url("/profile");
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
