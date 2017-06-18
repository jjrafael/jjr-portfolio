JJR.extend('Nav', function(App) {

    var configMap = {};

    var stateMap = {
        menu: [
            'home',
            'experiences',
            'projects',
            'lets talk'
        ],
        isOpen: false,
        sectionDistance: {
            'home': 0,
            'experiences': 0,
            'projects': 0
        }
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
        var section_trim = section.replace(/\s/g,'');
        var offset = 20; //Offset of 20px
        if(section_trim === 'letstalk'){
            if($('.talk-wrapper').length === 0){
                App.Talk.load();
            }else{
                App.Talk.showTalkSection();
            }
        }else{
            $('html, body').animate({
                scrollTop: $('#'+section_trim).offset().top + offset
            }, 500);

            if(section_trim === 'experiences'){
                App.Experiences.animateGraphs();
            }
        }
        
        activateMenu($(item).text());
        setTimeout(function(){
            $('nav').removeClass('open');
            $('body').css('overflow', '');
        }, 500);
    }

    var toggleNav = function(){
        $('nav').toggleClass('open');

        if($('nav').hasClass('open')){
            $('body').css('overflow', 'hidden');
        }else{
            $('body').css('overflow', '');
        }
    }

    var activateMenu = function(menu) {
        var menu = menu.trim();

        $('.nav-item:not([data-menu="'+menu+'"])').removeClass('active');
        $('.nav-item[data-menu="'+menu+'"]').addClass('active');
    }

    var inspectPage = function() {
        var cont = $('.page-wrapper');
        var scrollTop = $(window).scrollTop();
        var sectionDistance = stateMap.sectionDistance;
        var nearestSect = '';
        $(cont).each(function(){
            elementOffset = $(this).offset().top,
            distance      = Math.abs(elementOffset - scrollTop);
            sectionDistance[$(this).attr('id')] = distance;
        });
        
        if(sectionDistance['home'] < sectionDistance['experiences'] && sectionDistance['home'] < sectionDistance['projects']){
            nearestSect = 'home';
        }else {
            if(sectionDistance['experiences'] < sectionDistance['projects']){
                nearestSect = 'experiences';
            }else{
                nearestSect = 'projects';
            }
        }

        activateSection(nearestSect);
    }

    var activateSection = function(section) {
        $('body').attr('data-page', section);
        $('.page-wrapper:not(#'+section+')').removeClass('active');
        $('#'+section).addClass('active');
        activateMenu(section);

        if(section === 'experiences'){
            App.Experiences.animateGraphs();
        }
    }

    var render = function() {
        var $nav = $('.nav-wrapper');
        var data = {
            menu: stateMap.menu,
            isOpen: stateMap.isOpen === true ? 'open' : ''
        }
        $nav.html(Handlebars.Templates['nav']({'data': data}));

        // setTimeout(function(){
        //     //inspectPage();
        // }, 1000)
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

        $(window).scroll(function(){
            inspectPage();
        });
    };

    var load = function($container) {
        render();
        bind();
    };

    return {
        load: load,
        inspectPage: inspectPage,
        activateMenu: activateMenu
    }

});