(function(){
    angular
        .module("PollyannaApp")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;
        var newUser = {};
        function init() {

        }
        init();

        function register(user) {
            if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
                if (user.password == user.password2) {
                    newUser.roles = ['standard'];
                    newUser.groups = [];
                    newUser.gifts = [];
                    newUser.assignments = [];
                    newUser.email = user.email;
                    newUser.password = user.password;
                    UserService
                        .register(newUser)
                        .then(function (response) {
                            var currentUser = response.data;
                            if (currentUser != null) {
                                UserService.setCurrentUser(currentUser);
                                $location.url("/profile");
                            }
                        });
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