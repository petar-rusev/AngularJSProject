'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/login',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/user/register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            logout: function() {
                delete sessionStorage['currentUser'];
            },

            getCurrentUser : function() {
                var userObject = sessionStorage['currentUser'];
                if (userObject) {
                    return JSON.parse(sessionStorage['currentUser']);
                }
            },

            isAnonymous : function() {
                return sessionStorage['currentUser'] == undefined;
            },

            isLoggedIn : function() {
                return sessionStorage['currentUser']!=undefined;
            },

            isNormalUser : function() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (!currentUser.isAdmin);
            },

            isAdmin : function() {
                var currentUser=this.getCurrentUser();
                return(currentUser!=undefined)&&(!currentUser.isAdmin);
            },

            getAuthHeaders : function() {
                var headers = {};
                var currentUser = this.getCurrentUser();
                if (currentUser) {
                    headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                }
                return headers;
            },
            getUserProfile: function(success,error){
                var headers = this.getAuthHeaders()
                $http({method:"GET",headers:headers, url:baseServiceUrl+"/api/user/Profile"})
                    .success(function(data){
                        success(data)
                    }).error(function(data){
                        error(data)
                    })
            },
            editUserProfile: function(data,success,error){
                var headers = this.getAuthHeaders()
                $http({method:"PUT",headers:headers,data:data, url:baseServiceUrl+"/api/user/Profile"})
                    .success(function(data){
                        success(data)
                    }).error(function(data){
                        error(data)
                    })
            },
            editUserPassword: function(data,success,error){
                var headers = this.getAuthHeaders()
                $http({method:"PUT",data:data,headers:headers, url:baseServiceUrl+"/api/user/changePassword"})
                    .success(function(data){
                        success(data)
                    }).error(function(data){
                        error(data)
                    })
            }
        }
    }
);
