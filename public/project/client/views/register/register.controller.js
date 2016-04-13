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
            if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
                if (user.password == user.password2 || !user.password || !user.password2) {
                    newUser.roles = ['standard'];
                    newUser.groups = [];
                    newUser.gifts = [];
                    newUser.assignments = [];
                    newUser.email = user.email;
                    newUser.password = user.password;
                    newUser.firstName = user.firstName;
                    newUser.lastName = user.lastName;
                    UserService
                        .register(newUser)
                        .then(
                            function(response) {
                                var user = response.data;
                                if(user != null) {
                                    $rootScope.currentUser = user;
                                    $location.url("/profile");
                                }
                            },
                            function(err) {
                                vm.error = err;
                            }
                        );
                }
                else {
                    alert("Passwords do not match.");
                }
            }
            else {
                alert("Email address is invalid.");
            }

        }
    }
})();