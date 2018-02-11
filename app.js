
(function(){

    var app = angular.module('taskApp', []);

    app.controller('MainController', ['$http', function ($http){
        
        var main = this;
        main.users = [];

        $http.get("app-data/data.json").success(function(data){
            main.users = data;
        });

        console.log(main);

    }]);

    app.directive("navBar", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/nav-bar.view.html"
        };
    });

    app.directive("newProject", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/new-project.view.html"
        };
    });

    app.directive("newTask", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/new-task.view.html"
        };
    });

    app.directive("projectDetails", function(){

        return {
            restrict : 'E',
            templateUrl : "app-views/project-details.view.html"
        };
    });


    //not in use
    app.directive("login", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/login.view.html"
        };
    });   

})();
