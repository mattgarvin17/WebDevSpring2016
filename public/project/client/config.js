(function(){
    angular
        .module("PollyannaApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/assignments', {
                templateUrl: 'views/assignments/assignments.view.html',
                controller: 'AssignmentsController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/gifts', {
                templateUrl: 'views/gifts/gifts.view.html',
                controller: 'GiftsController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/groups', {
                templateUrl: 'views/groups/groups.view.html',
                controller: 'GroupsController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/invites', {
                templateUrl: 'views/invites/invites.view.html',
                controller: 'InvitesController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/create-group', {
                templateUrl: 'views/create-group/createGroup.view.html',
                controller: 'CreateGroupController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/group-details/:groupID', {
                templateUrl: 'views/group-details/groupDetails.view.html',
                controller: 'GroupDetailsController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/user-details/userID', {
                templateUrl: 'views/user-details/userDetails.view.html',
                controller: 'UserDetailsController',
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
            .when('/admin-users', {
                templateUrl: 'views/admin/users/admin.users.view.html',
                controller: 'AdminUsersController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when('/admin-assignments', {
                templateUrl: 'views/admin/assignments/admin.assignments.view.html',
                controller: 'AdminAssignmentsController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when('/admin-gifts', {
                templateUrl: 'views/admin/gifts/admin.gifts.view.html',
                controller: 'AdminGiftsController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when('/admin-groups', {
                templateUrl: 'views/admin/groups/admin.groups.view.html',
                controller: 'AdminGroupsController',
                controllerAs: 'model',
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when('/admin-invites', {
                templateUrl: 'views/admin/invites/admin.invites.view.html',
                controller: 'AdminInvitesController',
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

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/pollyanna/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
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
