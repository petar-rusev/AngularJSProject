/**
 * Created by AMILO on 8.1.2015 г..
 */

app.controller('AdminController',
    function ($scope,adminDecisionService,adminService,notifyService) {
        $scope.decisionId =function(id,decision) {
            adminDecisionService.decision(id, decision, function (resp) {
                notifyService.showInfo("success")
                $scope.reloadAds()
            })
        }
        $scope.params={
            Status:0,
            'startPage' : 1,
            'pageSize' : 4
        }
        $scope.deleteAd=function(id){
            adminDecisionService.deleteAd(id,function(success){
                notifyService.showInfo("ad deleted")
                $scope.reloadAds()
            },function(error){
                notifyService.showError("try again")
            })

        }
        $scope.reloadAds=function(){
            adminDecisionService.getAds($scope.params,function(data){
                $scope.adminAds=data
            })
        }
        $scope.reloadAds()
        $scope.$on("adminGetCategoryChanged", function(event,id) {
            $scope.params.Status=id
            $scope.reloadAds()
        });
        adminService.getUsers(null,function success(data){
            $scope.systemUser=data.users;
            },function error(resp){
                notifyService.showError("unable to load users")
            })
        adminService.getCategories(function success(data){
            $scope.categories=data.categories
        },function err(err){
            notifyService.showError("unable to load categories")
        })
        adminService.getTowns(function success(data){
            $scope.towns=data.towns
        },function err(err){
            notifyService.showError("unable to load categories")
        })


        $scope.deleteUser=function(username){
            adminService.deleteUsers(username,function success(sucess){
                notifyService.showInfo("user deleted")
            },function error(resp){
                notifyService.showError("try  again")
            })
        }
        $scope.deleteAd=function(id){
            console.log(id);
            adminService.deleteAd(id,function success(sucess){
                notifyService.showInfo("category deleted")
            },function error(resp){
                notifyService.showError("try  again")
            })
        }

    }
);
