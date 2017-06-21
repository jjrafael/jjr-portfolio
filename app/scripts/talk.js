JJR.extend('Talk', function(App) {

    var configMap = {};

    var stateMap = {
        
    };

    var jqueryMap = {};

    var setjQueryMap = function($container) {
        jQueryMap = { 
            $container : $container
        };
        return true;    
    };

    var showTalkSection = function(val) {
        var cont = $('.talk-wrapper');
        if(val === 'close'){
            $('body').css('overflow', '');
            setTimeout(function(){
                $(cont).find('.talk-inner').animate({
                    'margin-top': 80,
                    'opacity': 0
                }, 150);
            }, 150);
            setTimeout(function(){
                $(cont).addClass('active');
                $(cont).animate({
                    'left': -2800,
                    'opacity': 0
                }, 300);
            }, 500);
            setTimeout(function(){
                $('body').css('overflow', '');
                $(cont).removeClass('active');
                App.Nav.inspectPage();
            }, 800);
        }else {
            $('body').css('overflow', 'hidden');
            setTimeout(function(){
                $('body').css('overflow', 'hidden');
                $(cont).addClass('active');
                App.Nav.activateMenu('lets talk');
            }, 150);
            setTimeout(function(){
                $(cont).addClass('active');
                $(cont).animate({
                    'left': 0,
                    'opacity': 1
                }, 300);
            }, 500);
            setTimeout(function(){
                $(cont).find('.talk-inner').animate({
                    'margin-top': 0,
                    'opacity': 1
                }, 550);
            }, 900);
        }
    };

    var render = function() {
        var $container = $('#talk');   

        $container.html(Handlebars.Templates['talk']());

        showTalkSection();  
    };

    var bind = function() {
        var $container = $('.talk-wrapper');
        var talkmenu = $('.nav-item');

        $(talkmenu).on('click', function(){
            if($('.talk-wrapper').hasClass('active')) {
                showTalkSection('close');
            }
        });
    };

    var load = function($container) {    
        render();
        bind();
    };

    return {
        load: load,
        showTalkSection: showTalkSection
    }

});