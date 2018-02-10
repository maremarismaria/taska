
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
            templateUrl : "user-details.html",
            controller: function($scope, $http){
                $http.get("app-data/data.json").then(function(response) {
                    $scope.data = response.data;
                });
            }
        };
    });
    
})();
