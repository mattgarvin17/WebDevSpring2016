(function()
{
    angular
        .module("PollyannaApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/",
                    {
                        templateUrl: "header/header.view.html"
                    })
                .when("/home",
                    {
                        templateUrl: "home/home.view.html",
                        controller: "HomeController"
                    })
                .when("/users",
                    {
                        templateUrl: "users/users.view.html",
                        controller: "UsersController"
                    })
                .when("/groups",
                    {
                        templateUrl: "groups/groups.view.html",
                        controller: "GroupsController"
                    })
                .when("/assignments",
                    {
                        templateUrl: "assignments/assignments.view.html",
                        controller: "AssignmentsController"
                    })
                .when("/gifts",
                    {
                        templateUrl: "gifts/gifts.view.html",
                        controller: "GiftsController"
                    })
                .otherwise(
                    {
                        redirectTo: "/home"
                    })

        });
})();