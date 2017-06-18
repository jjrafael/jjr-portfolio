var JJR = (function (){
    'use strict';
    var App = {
        init: []
    };

    var initModule = function( $container ) {
        console.log('Initializing Portfolio...');
        App.$container = $container;

        if(App.init.length > 0){

            for(var i=0; i < App.init.length; i++){
                App.init[i]();
            }
        }

        App.Nav.load();
        App.Brand.load();
        App.Experiences.load();
        App.Projects.load();

        setTimeout(function(){
            App.Brand.toggleOverlay();
        }, 2000);
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