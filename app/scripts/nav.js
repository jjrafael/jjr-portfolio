JJR.extend('Nav', function(App) {

    var configMap = {};

    var stateMap = {
        menu: [
            'home',
            'about',
            'projects',
            'contact'
        ],
        isOpen: false
    };

    var jqueryMap = {};

    var setjQueryMap = function($container) {
        jQueryMap = { 
            $container : $container
        };
        return true;
    };

    var scrollToSection = function(el) {
        var item = el;
        var nav = $(item).closest('nav');
        var section = $(item).text().toLowerCase().trim();
        var offset = 20; //Offset of 20px

        $('html, body').animate({
            scrollTop: $('#'+section).offset().top + offset
        }, 500);

        $('nav').removeClass('open');
    }

    var toggleNav = function(){
        $('nav').toggleClass('open');

        if($('nav').hasClass('open')){
            $('body').css('overflow', 'hidden');
        }else{
            $('body').css('overflow', '');
        }
    }

    var render = function() {
        var $nav = $('.nav-wrapper');
        var data = {
            menu: stateMap.menu,
            isOpen: stateMap.isOpen === true ? 'open' : ''
        }
        $nav.html(Handlebars.Templates['nav']({'data': data}));
    };

    var bind = function() {
        var $nav = $('nav');

        $nav.on('click', function(e){
            if($('nav').hasClass('open')){
                if(e.target.className == '.nav-item')
                    return;
                if($(e.target).closest('.nav-item').length)
                    return; 
            } 
            toggleNav(this);
        });

        $('.nav-item').on('click', function(e){
            if($(this).closest('nav').hasClass('open')){
                //console.log('jj navitem click');
                scrollToSection(this);
            }
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