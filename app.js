
(function(){

    var app = angular.module('taskApp', []);

    app.controller('MainController', ['$http', function ($http){
        
        var main = this;
        main.data = [];

        //current project and panels
        main.currentProject = [];
        main.getPanelsFromSelectedProject = function() {
            return main.currentProject.panels;
        };

        //new project
        main.newProjectName = "";
        main.newProject = { name : "", panels : [] };
        main.addProject = function(){
            main.newProject.name = main.newProjectName;
            console.log(main.newProject);
        };

        //new panel
        main.newPanelName = "";
        main.newPanel = { title : "", tasks : [] };
        main.addPanel = function(){
            main.newPanel.title = main.newPanelName;
            console.log(main.newPanel);
        };

        //new task
        main.newTaskTitle = "";
        main.newTask = { title : "", done : false };
        main.addTask = function(){
            main.newTask.title = main.newTaskTitle;
            console.log(main.newTask);
        }
       
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
