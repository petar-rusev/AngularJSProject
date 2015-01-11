'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource','ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
app.constant('pageSize',3);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register',{
        templateUrl:'templates/register.html',
        controller:'RegisterController'
    });
    $routeProvider.when('/user/createAdd',{
        templateUrl:'templates/user/createAdd.html',
        controller:'UserAddController'
    });
    $routeProvider.when('/user/ownAds',{
        templateUrl:'templates/user/ownAds.html',
        controller:'UserAddController'
    });
    $routeProvider.when('/user/publishedAds',{
        templateUrl:'templates/user/publishedAds.html',
        controller:'UserAddController'
    });
    $routeProvider.when('/user/waitingAds',{
        templateUrl:'templates/user/waitingAds.html',
        controller:'UserAddController'
    });
    $routeProvider.when('/user/rejectedAds',{
        templateUrl:'templates/user/rejectedAds.html',
        controller:'UserAddController'
    });
    $routeProvider.when('/user/inactiveAds',{
        templateUrl:'templates/user/inactiveAds.html',
        controller:'UserAddController'
    });
    $routeProvider.when('/user/editProfile',{
        templateUrl:'templates/user/editProfil.html',
        controller:'UserProfileController'

    });
    $routeProvider.when('/admin/adminDecisionAd',{
        templateUrl:'templates/admin/adminDecisionAd.html',
        controller:'AdminController'

    });
    $routeProvider.otherwise(
        { redirectTo: '/' }
    );

});
app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
// Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }
    });
});


