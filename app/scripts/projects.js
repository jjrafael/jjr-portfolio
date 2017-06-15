JJR.extend('Projects', function(App) {

    var configMap = {};

    var stateMap = {
        projects: null,
        intervalAnimDetails: 500
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
            showProjectDetails(cont);
        }else{
            $('body').css('overflow', '');
        }
        
    }

    var showProjectDetails = function(cont) {
        stateMap.intervalAnimDetails = 500;
            $(cont).find('.details-container').each(function(){
                var el = $(this);
                setTimeout(function() {
                    $(el).addClass('animate');    
                }, stateMap.intervalAnimDetails);
                setTimeout(function(){
                    $(el).css({
                       'background' : 'black',
                       'box-shadow' : '0px 0px 10px 2px rgba(0,0,0,0,0.25)'

                    });
                }, stateMap.intervalAnimDetails + 230);
                setTimeout(function(){
                    $(el).find('.details-inner').animate({
                        opacity: '1'
                    });
                }, stateMap.intervalAnimDetails + 250);
                stateMap.intervalAnimDetails = stateMap.intervalAnimDetails + 300;
            });
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