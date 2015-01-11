'use strict';

// The AppController holds the presentation logic for the entire app (common all screens)
app.controller('AppController',
    function ($scope,$rootScope, authService,$location,userService,notifyService) {
// Put the authService in the $scope to make it accessible from all screens
        $scope.authService = authService;

// Implement the "logout" button click event handler
        $scope.logout = function() {
            authService.logout();
            notifyService.showInfo("Logout Successful!");
            $location.path('/home.html');
        };

        $rootScope.loadMyAds=function() {
            console.log("load my ads")
            userService.getUserAds({status: 0}, function success(data) {
                $scope.inactiveAds = data
            }, function (err) {
                console.log(err)
            })
            userService.getUserAds({status: 1}, function success(data) {
                $scope.waitingAds = data
            }, function (err) {
                console.log(err)
            })
            userService.getUserAds({status: 2}, function success(data) {
                $scope.publishedAds = data
            }, function (err) {
                console.log(err)
            })
            userService.getUserAds({status: 3}, function success(data) {
                $scope.rejectedAds = data
            }, function (err) {
                console.log(err)
            })

        }

    }
);
