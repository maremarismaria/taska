
(function(){

    var app = angular.module('taskApp', []);

    app.controller('MainController', ['$http', function ($http){
        
        var main = this;

        //All data from JSON file, after promise success
        main.data = [];

        //current project
        main.currentProject = [];
        main.getSelectedProject = function() {
            return main.currentProject;
        };

        //current panel
        main.currentPanel = [];
        main.setCurrentPanel = function (panel){
            main.currentPanel = panel;
        }

        //delete project
        main.deleteProject = function(project){
            main.data.projects.splice(main.data.projects.indexOf(project.name), 1);
        }

        //delete panel
        main.deletePanel = function(panel){
            main.currentProject.panels.splice(main.currentProject.panels.indexOf(panel), 1);
        };

        //delete task
        main.deleteTask = function(panel, task){
            panel.tasks.splice(panel.tasks.indexOf(task), 1);
        };

        //new project
        main.newProjectName = "";
        main.newProject = { name : "", panels : [] };
        main.addProject = function(){
            if(main.newProjectName != ""){
                main.newProject.name = main.newProjectName;
                console.log(main.newProject);
                main.data.projects.push(main.newProject);
                main.newProject = { name : "", panels : [] };
            }
        };

        //new panel
        main.newPanelName = "";
        main.newPanel = { title : "", tasks : [] };
        main.addPanel = function(){
            if(main.newPanelName != ""){
                main.newPanel.title = main.newPanelName;
                console.log(main.newPanel);
                main.currentProject.panels.push(main.newPanel);
                main.newPanel = { title : "", tasks : [] };
            }
        };

        //new task
        main.newTaskTitle = "";
        main.newTask = { title : "", done : false };
        main.addTask = function(){
            if(main.newTaskTitle != ""){
                main.newTask.title = main.newTaskTitle;
                console.log(main.currentPanel);
                console.log(main.newTask);
                main.currentPanel.tasks.push(main.newTask);
                main.newTask = { title : "", done : false };
            }
        }

        
        //Retrieving data from JSON file
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

    app.directive("editProject", function(){

        return {
            restrict : 'E',
            templateUrl : "app-views/edit-project.view.html"
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