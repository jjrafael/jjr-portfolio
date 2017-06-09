JJR.extend('Model', function(App) {
    var configMap = {
    	appName: 'JJR',
        url: '/json/'
    };

    var stateMap = {
        ajax: false
    };

    var consoleLogErr = function(url) {
        console.log('Something went wrong on: ' + url);
    }

    var getHomeContents = function(callBack, errorCallBack) {
        var url = configMap.url;
        //App.Util.loader('open')
		$.ajax({
		  url: url + 'homecontents.json?a='+Math.random(),
		  type: "GET",
		  dataType: "json",
		  success: function(data){
		    if (typeof callBack === 'function') {
                callBack(data);
            }
		  },
		  error: function(xhr){
		    if (typeof errorCallBack === 'function') {
                errorCallBack(xhr);
            }
		  }
		});
    };


    return $.extend(configMap, {
    	getHomeContents: getHomeContents,
    }, true);


});