app.factory("adminDecisionService",function($http,baseServiceUrl,authService){
    var decision =function(id,decision,success){
        var headers =authService.getAuthHeaders()
        $http({method:"PUT",headers:headers,url:baseServiceUrl+"/api/admin/Ads/"+decision+"/"+id})
            .success(function(data){
                success(data)
            })
        }

    var getAds =function(params,success){
        var headers =authService.getAuthHeaders()
        $http({method:"GET",params:params,headers:headers,url:baseServiceUrl+"/api/admin/Ads"})
            .success(function(data){
                success(data)
            })
    }
    var deleteAd = function(id,success,error){
        console.log(id);
            var headers =authService.getAuthHeaders()
                $http({method:"DELETE",headers:headers,url:baseServiceUrl+"/api/admin/Ads/"+id})
                    .success(function(data){
                        success(data)
                    }).error(function(resp){
                        error(resp)
                    })
        }
    return{
        decision:decision,
        getAds:getAds,
        deleteAd:deleteAd
    }
})
app.factory("adminService",function($http,baseServiceUrl,authService){
    var getUsers =function(params,success,error){
        var headers =authService.getAuthHeaders()
        $http({method:"GET",params:params,headers:headers,url:baseServiceUrl+"/api/admin/Users"})
            .success(function(data){
                success(data)
            }).error(function(resp){
                error(resp)
            })
        }
    var deleteUsers =function(username,success,error){
        var headers =authService.getAuthHeaders()
        $http({method:"DELETE",headers:headers,url:baseServiceUrl+"/api/admin/User/"+username})
            .success(function(data){
                success(data)
            }).error(function(resp){
                error(resp)
            })
    }
    var getCategories=function(success,error){
        var headers =authService.getAuthHeaders()
        $http({method:"GET",headers:headers,url:baseServiceUrl+"/api/admin/categories"})
            .success(function(data){
                success(data)
            }).error(function(resp){
                error(resp)
            })
    }
    var getTowns=function(success,error){
        var headers =authService.getAuthHeaders()
        $http({method:"GET",headers:headers,url:baseServiceUrl+"/api/admin/towns"})
            .success(function(data){
                success(data)
            }).error(function(resp){
                error(resp)
            })
    }
    var deleteAd =function(id,success,error){
        var headers =authService.getAuthHeaders()
        $http({method:"DELETE",headers:headers,url:baseServiceUrl+"/api/admin/categories/"+id})
            .success(function(data){
                success(data)
            }).error(function(resp){
                error(resp)
            })
    }

    return{
        getUsers:getUsers,
        deleteUsers:deleteUsers,
        getCategories:getCategories,
        deleteAd:deleteAd,
        getTowns:getTowns
    }
})
