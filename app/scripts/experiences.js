JJR.extend('Experiences', function(App) {

    var configMap = {};

    var stateMap = {
        xps: null,
        intervalAnimBars: 300
    };

    var jqueryMap = {};

    var setjQueryMap = function($container) {
        jQueryMap = { 
            $container : $container
        };
        return true;
    };

    var render = function() {
        var $container = $('#experiences');
        App.Model.getExperiences(renderXP, showError);      
    };

    var renderXP = function(data) {
        var $container = $('#experiences');
        stateMap.xps = data;
        $container.html(Handlebars.Templates['experiences']({'data': stateMap.xps}));      
    }


    var showError = function(xhr) {
        console.log('fetching experiences failed');
    }

    var animateGraphs= function() {
        var $container = $('#experiences');
        stateMap.intervalAnimBars = 300;

        $container.find('.bar-wrap').each(function(){
            var w = parseInt($(this).data('perc'), 10);
            var el = $(this);
            setTimeout(function(){
                $(el).find('.bar').css('width', w);
            }, stateMap.intervalAnimBars);
            stateMap.intervalAnimBars = stateMap.intervalAnimBars + 150;
        });
    }

    var bind = function() {
        var $container = $('.xp-wrapper');
    };

    var load = function($container) {    
        render();
        bind();
    };

    return {
        load: load,
        animateGraphs: animateGraphs
    }

});