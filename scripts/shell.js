var JJR = (function (){
    'use strict';

    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });

    var App = {
        init: []
    };

    var initModule = function( $container ) {
        console.log('Initializing Portfolio...');
        App.$container = $container;

        window.scrollTo(0, 0);
        $('html, body').scrollTop(0);

        if(App.init.length > 0){
            for(var i=0; i < App.init.length; i++){
                App.init[i]();
            }
        }

        App.Nav.load();
        App.Brand.load();
        App.Experiences.load();
        App.Tools.load();
        App.Projects.load();

        setTimeout(function(){
            var pathname = window.location.pathname;
            var id = pathname ? pathname.substring(1) : false;
            var cont = id ? $('#'+id+'.project-container') : false;
            var contExists = id ? cont.length : 0;
            var isWalkthru = id ? cont.find('.mid-column[data-type="walkthru"], .mid-column[data-type="beforeafter"]').length : 0;
            
            if(id && contExists && isWalkthru) {
                App.Projects.openProjectDetails(id);
            } else {
                //remove extra pathname
                window.history.pushState({}, '' , '/');
                window.scrollTo(0, 0);
                $('html, body').scrollTop(0);
            }
        }, 1000);

        setTimeout(function(){
            App.Brand.toggleOverlay('close');
            window.scrollTo(0, 0);
            $('html, body').scrollTop(0);
            if (App.Nav && App.Nav.inspectPage) {
                App.Nav.inspectPage();
            }
        }, 2300);
    };

    var errorCallBack = function(data, options) {
        if(data.responseText){
            var response = data.responseText;
            var regExp = /\[([^)]+)\]/; 
            response = regExp.exec(response);
            response = data.responseText.indexOf('[') >= 0 ? response[1] : data.responseText;
            if(data.response.indexOf('ECONNREFUSED') >= 0){
                //App.Util.showAlertMsg('api-resp','Our server is busy at the moment, please try again later.');
            }else{
                //App.Util.showAlertMsg('api-resp', response);
            }
        }else{
            if(data.message){
                //App.Util.showAlertMsg('api-resp', data.message);
            }else{
                //App.Util.showAlertMsg('error');
            }
        }
        //App.Util.toploader('close');
        console.log('Something went wrong while connecting');
    };

    var extend = function(module,obj){
        App[module] = obj(App);
        return App;
    };

    return {
        initModule: initModule,
        extend : extend
    };

}());