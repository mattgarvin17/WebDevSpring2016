(function(){
    angular
        .module("PollyannaApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when('/profile/:userID', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/login', {
                templateUrl: 'views/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/admin-home', {
                templateUrl: 'views/admin/home/admin.home.view.html',
                controller: 'AdminHomeController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when('/admin-home', {
                templateUrl: 'views/admin/home/admin.home.view.html',
                controller: 'AdminHomeController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/pollyanna/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            else if (user !== '0')
            {
                $rootScope.cleverMessage = "Don't be clever, " + user.firstName + ". You know you're not allowed do that.";
                $location.url('/home');
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, $routeParams)
    {
        var deferred = $q.defer();

        $http.get('/api/pollyanna/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                if ($rootScope.currentUser._id == $routeParams.userID ||
                    $rootScope.currentUser.roles.indexOf('admin') > -1) {
                    $rootScope.editProfile = True;
                }
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/pollyanna/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();
