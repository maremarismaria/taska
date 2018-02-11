
(function(){

    var app = angular.module('taskApp', []);

    app.controller('mainController', function($scope, $http){
        
        /*
        $http.get("app-data/data.json").then(function(response) {
            $scope.data = response.data;
        });

        
        $scope.visibility = false;
        $scope.showButton = function() {
            $scope.visibility = !$scope.visibility;
        }
        */

    });

    app.directive("userDetails", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/user-details.view.html",
            controller: function($scope, $http){

                $scope.showUserData = false;

                $http.get("app-data/data.json").then(function(response) {
                    $scope.data = response.data;
                });
            }
        };
    });

    app.directive("login", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/login-view.html",
            controller: function($scope, $http){

                $scope.showLogin = true;

                $scope.login = function(){

                    $http.get("app-data/data.json").then(function(response) {
                                                
                        angular.forEach(response.data, function(value, key){

                            if(value.user == $scope.username && value.password == $scope.password){
                                console.log("LOGIN");
                                $scope.showLogin = false;
                                $scope.showUserData = true;
                            }
                    
                        });
                    });
                };
            }
        };
    });

})();
