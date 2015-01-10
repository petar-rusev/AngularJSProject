'use strict';

app.controller('HomeController',
    function ($scope, adsService, notifyService) {
        adsService.getAds(
            null,
            function success(data) {
                //$scope.ads=data;
            },
            function error(err) {
                notifyService.showError("Cannot load ads", err);
            }
        );
        $scope.adsParams={
            'startPage':1,
            'pageSize': 2
        };
        $scope.reloadAds=function(){
            adsService.getAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads=data;
                },
                function error(err) {
                    notifyService.showError(err);
                }
            );

        };

        $scope.$on("categorySelectionChanged", function(event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });

        $scope.$on("townSelectionChanged", function(event, selectedTownId) {
            $scope.adsParams.TownId = selectedTownId;
            $scope.adsParams.startPage = 1;
            $scope.reloadAds();
        });
            $scope.reloadAds();
    }
);
