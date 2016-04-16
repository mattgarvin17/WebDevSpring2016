(function(){
    angular
        .module("PollyannaApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope) {
        var vm = this;
        var newUser = {};
        vm.updateUser = updateUser;
        vm.edit = edit;
        vm.editProfile = false;
        vm.currentUser = $rootScope.currentUser;
      
        function edit() {
            vm.editProfile = true;
        }
        
        function updateUser(user) {
            if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) && user.email) {
                if (user.password == user.password2 || !user.password || !user.password2) {
                    if (user.firstName && user.lastName) {
                        newUser.roles = ['standard'];
                        newUser.groups = [];
                        newUser.gifts = [];
                        newUser.assignments = [];
                        newUser.email = user.email;
                        newUser.password = user.password;
                        newUser.firstName = user.firstName;
                        newUser.lastName = user.lastName;
                        UserService
                            .updateUser(newUser)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    if (user != null) {
                                        $rootScope.currentUser = user;
                                        $location.url("/profile/{{currentUser._id");
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
