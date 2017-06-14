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

    var toggleProjectDetails = function(el) {
        var cont = $(el).closest('.project-container');
        $(cont).toggleClass('open');

        if($(cont).hasClass('open')){
            $('body').css('overflow', 'hidden');
        }else{
            $('body').css('overflow', '');
        }
        
    }

    var showError = function(xhr) {
        console.log('data failed');
    }

    var bind = function() {
        var $container = $('.projects-wrapper');

        $container.on('click', '.btn-more', function(){
            toggleProjectDetails(this);
        });
    };

    var load = function($container) {    
        render();
        bind();
    };

    return {
        load: load
    }

});