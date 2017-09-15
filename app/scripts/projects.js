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
        var id = cont.attr('id');
        $(cont).toggleClass('open');

        if($(cont).hasClass('open')){
            App.Brand.toggleOverlay('open');
            $('body').css('overflow', 'hidden');
            if($(cont).find('.details-container').length === 0){
                App.Model.getProjectDetail(id, renderProjectDetails, noDetailsFound);
            }else{
                App.Brand.toggleOverlay('close');
            }
        }else{
            $('body').css('overflow', '');
        }
        
    }

    var renderProjectDetails = function(data, id) {
        var $container = $('#'+id+'.project-container');
        $container.find('.details-wrapper').html(Handlebars.Templates['project']({'data': data}));
        setTimeout(function(){
            App.Brand.toggleOverlay('close');  
            showProjectDetails(id);
        }, 800);
        
    }

    var showProjectDetails = function(id) {
        var cont = $('#'+id+'.project-container');
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

    var noDetailsFound = function(id) {
        var cont = $('#'+id+'.project-container');
        var errHtml = '<div class="err-msg">No details yet. Shoot me a message to discuss them.</div>';
        $(cont).find('.details-wrapper').html(errHtml);
        App.Brand.toggleOverlay('close'); 
    }

    var showError = function(xhr) {
        console.log('data failed: ', xhr);
    }

    var bind = function() {
        var $container = $('.projects-wrapper');

        $container.on('click', '.btn-more:not(.disabled)', function(){
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