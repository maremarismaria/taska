(function(){

    const app = angular.module('taskApp', []);

    app.controller('MainController', ['$http', function ($http){
        
        const main = this;
              main.data = [];

        const ls = localStorageService();


        //Projects
        main.newProjectName = "";
        main.newProject = { name : "", panels : [] };
        main.addProject = function(){
            if(main.newProjectName != ""){
                main.newProject.name = main.newProjectName;
                main.data.projects.push(main.newProject);
                main.newProject = { name : "", panels : [] };
                ls.set('data', main.data);
            }
        };

        main.currentProject = [];
        main.getSelectedProject = function() {
            return main.currentProject;
        };

        main.updateProjectName = function(){
            ls.set('data', main.data);
        }

        main.deleteProject = function(project){
            main.data.projects.splice(main.data.projects.indexOf(project.name), 1);
            ls.set('data', main.data);
        }


        //Panels
        main.newPanelName = "";
        main.newPanel = { title : "", tasks : [] };
        main.addPanel = function(){
            if(main.newPanelName != ""){
                main.newPanel.title = main.newPanelName;
                main.currentProject.panels.push(main.newPanel);
                main.newPanel = { title : "", tasks : [] };
                ls.set('data', main.data);
            }
        };

        main.currentPanel = [];
        main.setCurrentPanel = function (panel){
            main.currentPanel = panel;
        }

        main.updatePanelTitle = function (){
            ls.set('data', main.data);
        }        
        
        main.deletePanel = function(panel){
            main.currentProject.panels.splice(main.currentProject.panels.indexOf(panel), 1);
            ls.set('data', main.data);
        };

        
        //Tasks
        main.newTaskTitle = "";
        main.newTask = { title : "", done : false };
        main.addTask = function(){
            if(main.newTaskTitle != ""){
                main.newTask.title = main.newTaskTitle;
                main.currentPanel.tasks.push(main.newTask);
                main.newTask = { title : "", done : false };
                ls.set('data', main.data);
            }
        }

        main.updateTask = function (){
            ls.set('data', main.data);
        }

        main.deleteTask = function(panel, task){
            panel.tasks.splice(panel.tasks.indexOf(task), 1);
            ls.set('data', main.data);
        };


        //Retrieving data from JSON file, or from localStorage
        if(ls.get('data') != null){
            main.data = ls.get('data');
        }else{
            $http.get("app-data/data.json")
            .success(function(data){
                main.data = data;
            })
            .error(function (error, status) {
                let e = { message: error, status: status };
                console.log(e.status);
            });
        }

        //Service for localStorage, https://gist.github.com/ulisesantana/8bb0d6b02e675e6fb98480f06c9e0183
        function localStorageService() {
            return {

                get(itemName) {
                    let item = localStorage.getItem(itemName);
                    let numPatt = new RegExp(/^\d+$/);
                    let jsonPatt = new RegExp(/[\[\{].*[\}\]]/);
                
                    if(item){
                        if(jsonPatt.test(item)){
                            return JSON.parse(item);
                        }else if(numPatt.test(item)) {
                            return parseFloat(item);
                        }else{
                            return item;
                        }
                    }else{
                        return null;
                    }
                },
                
                set(itemName, item) {
                    if(typeof item === "object"){
                        localStorage.setItem(itemName, JSON.stringify(item));
                    }else{
                        localStorage.setItem(itemName, item);
                    }
                },
                
                remove(itemName) {
                    localStorage.removeItem(itemName);
                }
            }
        }

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

})();