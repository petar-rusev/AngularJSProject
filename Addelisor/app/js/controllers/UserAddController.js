'use strict';

app.controller('UserAddController',
    function ($http,$scope,$rootScope, $location,authService, townsService,baseServiceUrl, categoriesService,userService, notifyService) {

        $scope.adData = {townId: null, categoryId: null};
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();

        userService.getUserAds(null,function(success){
            $scope.userAds=success;
        })

        $scope.publishAd = function(adData) {
            userService.createNewAd(adData,
                function success() {
                    notifyService.showInfo("Advertisement submitted for approval. Once approved, it will be published.")
                    $location.path("/user/ownAds");
                },
                function error(err) {
                    notifyService.showError("Advertisment is not submitted. Please try again.")
                }
            );
        };
        $scope.fileSelected = function(fileInputField) {
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img id='pic' src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };
        $scope.deleteAd = function(id,success,err){
            var headers =authService.getAuthHeaders()
            $http({method:"DELETE",headers:headers,url:baseServiceUrl+"/api/user/ads/"+id})
                .success(function(data){
                    notifyService.showInfo("Deleted!")
                }).error(function(error){
                    notifyService.showError("Try Again!")
                })
        }

        $scope.deactivateAd= function(id,success,err){
            var headers =authService.getAuthHeaders()
            $http({method:"PUT",headers:headers,url:baseServiceUrl+"/api/user/ads/deactivate/"+id})
                .success(function(data){
                    notifyService.showInfo("Add Deactivated")
                    $rootScope.loadMyAds();
                }).error(function(resp){
                    notifyService.showError("Try Again!")
                })
        };
        $scope.activateAd=function(id,success,err){
            var headers =authService.getAuthHeaders()
            $http({method:"PUT",headers:headers,url:baseServiceUrl+"/api/user/ads/publishagain/"+id})
                .success(function(data){
                    notifyService.showInfo("Successful")
                }).error(function(resp){
                    notifyService.showError("Unsuccessful")
                })
        }

    }
);
