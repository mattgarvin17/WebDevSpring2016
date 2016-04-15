"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "views/users/register.controller.js"
            })
            .when("/login",{
                templateUrl: "/views/users/login.view.html",
                controller: "/views/users/login.controller.js"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "/views/users/profile.controller.js"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "views/admin/admin.controller.js"
            })
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "views/home/home.controller.js"
            })
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                controller: "views/forms/forms.controller.js"
            })
            .when("/fields",{
                templateUrl: "views/fields/fields.view.html",
                controller: "views/fields/fields.controller.js"
            })

            .otherwise({
                redirectTo: "views/home/home.view.html"
            });

    }
})();