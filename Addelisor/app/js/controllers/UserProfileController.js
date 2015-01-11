'use strict';

app.controller('UserProfileController',
    function ($scope,authService,townsService,notifyService) {
        authService.getUserProfile(function success(resp){
            $scope.currentUser=resp;
        },function error(resp){
            notifyService.showError("can't load user data")
        })
        $scope.towns = townsService.getTowns();
        $scope.changePassword=function(data){
            authService.editUserPassword(data,function success(resp){
                notifyService.showInfo("change successful")
            },function error(resp){
                notifyService.showError("try again")
            })
        }
        $scope.editUserProfile=function(data){
            authService.editUserProfile(data,
                function success(resp){
                    notifyService.showInfo("change successful")
                },function error(resp){
                    notifyService.showError("try again")
                })
        }


    }
);
