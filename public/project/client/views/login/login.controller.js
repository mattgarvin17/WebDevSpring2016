(function(){
    angular
        .module("PollyannaApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location, $rootScope) {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user)
        {
            if(user)
                UserService
                    .login({
                        username: user.email,
                        password: user.password
                    })
                    .then(
                        function(response)
                        {
                            $rootScope.currentUser = response.data;
                            $location.url("/home");
                        },
                        function(err) {
                            vm.error = err;
                            $rootScope.errorMessage = "Invalid email/password combination."
                        }
                    );
        }
    }
})();