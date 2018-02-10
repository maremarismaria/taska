
(function(){

    var app = angular.module('taskApp', []);

    app.controller('mainController', function($scope, $http){
        
        $http.get("app-data/data.json").then(function(response) {
            $scope.data = response.data;
        });

    });

})();
