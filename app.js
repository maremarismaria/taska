
(function(){

    var app = angular.module('taskApp', []);

    app.controller('MainController', ['$http', function ($http){
        
        var main = this;
        main.users = [];

        $http.get("app-data/data.json").success(function(data){
            main.users = data;
        });

        console.log(main)

    }]);

    app.directive("projectDetails", function(){

        return {
            restrict : 'E',
            templateUrl : "app-views/project-details.view.html"
        };
    });

    app.directive("login", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/login.view.html"
        };
    });

    app.directive("newTask", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/new-task.view.html"
        };
    });

})();
