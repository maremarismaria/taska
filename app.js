
(function(){

    var app = angular.module('taskApp', []);

    app.controller('MainController', ['$http', function ($http){
        
        var main = this;
        main.data = [];

        //To manage current project
        main.currentProject = [];

        main.getFirstProject = function () {
            return main.project[0].panels;
        }
        main.getSelectedProject = function() {
            return main.currentProject.panels;
        };
       
        $http.get("app-data/data.json")

            .success(function(data){
                main.data = data;
            })
            
            .error(function (error, status) {
                var e = { message: error, status: status };
                console.log( e.status );
            });

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

    app.directive("newPanel", function(){
        return {
            restrict : 'E',
            templateUrl : "app-views/new-panel.view.html"
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
