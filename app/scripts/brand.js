JJR.extend('Brand', function(App) {

    var configMap = {};

    var stateMap = {
        contents: null
    };

    var jqueryMap = {};

    var setjQueryMap = function($container) {
        jQueryMap = { 
            $container : $container
        };
        return true;
    };

    var render = function() {
        var $container = $('.brand-wrapper');
        App.Model.getHomeContents(renderContents);      
    };

    var renderContents = function(data) {
        var $container = $('.brand-wrapper');
        stateMap.contents = data;

        $container.html(Handlebars.Templates['home']({'data': stateMap.contents}));
        $container.find('.home-img:first-child').addClass('active');

        animateContents(stateMap.contents);
        window.setInterval(function () {
            animateContents(stateMap.contents);
        }, 10000); // repeat forever
    }

    var animateContents =function(data){
        var $container = $('.brand-wrapper');   
        var indx = 0;  
        var htmlPlus = ' <span class="plus">+</span>';
        var count = data.length;
        $.each(data, function(i, item) {

            setTimeout(function(){
                indx = i + 1;
                $container.find('.home-img').removeClass('active');
                $container.find('.home-img:nth-child('+indx+')').addClass('active');
                if(indx === count){
                    $container.find('.brand-intro h2').html(data[i].description);
                }else {
                    $container.find('.brand-intro h2').html(data[i].description+htmlPlus);
                }
                
            }, data[i].duration * (i + 1));
        })
    };

    var toggleOverlay = function() {
        $('.screen-overlay').toggleClass('active');
        //$('body').css('overflow', 'hidden');
        // if($('.screen-overlay').hasClass('active')){
        //     $('body').css('overflow', 'hidden');
        // }else{
        //     $('body').css('overflow', '');
        // }
    }

    var bind = function() {
        // var $container = $('.panel-left');
        // $container.on('mouseenter mouseleave', 'li', function(e){
        //     $container.toggleClass('active');
        //     $container.next().toggleClass('left-open');
        //     $('footer.onlogin').toggleClass('slide-left');
    };

    var load = function($container) {    
        render();
        bind();
    };

    return {
        load: load,
        toggleOverlay: toggleOverlay
    }

});