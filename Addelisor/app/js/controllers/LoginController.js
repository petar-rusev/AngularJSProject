'use strict';

app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        console.log("login")
        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                   $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Login Unsuccessful!");
                }
            );
        };
    }
);