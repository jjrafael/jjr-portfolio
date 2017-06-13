JJR.extend('Projects', function(App) {

    var configMap = {};

    var stateMap = {
        projects: null
    };

    var jqueryMap = {};

    var setjQueryMap = function($container) {
        jQueryMap = { 
            $container : $container
        };
        return true;
    };

    var render = function() {
        var $container = $('#projects');
        App.Model.getProjects(renderTimeline, showError);      
    };

    var renderTimeline = function(data) {
        var $container = $('.projects-wrapper');
        stateMap.projects = data;
        $container.html(Handlebars.Templates['projects']({'data': stateMap.projects}));
    }

    var showError = function(xhr) {
        console.log('data failed');
    }

    var bind = function() {
        
    };

    var load = function($container) {    
        render();
        bind();
    };

    return {
        load: load
    }

});