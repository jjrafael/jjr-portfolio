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
        //App.Util.loader('open');
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

    var getExperiences = function(callBack, errorCallBack) {
        var url = configMap.url;
        //App.Util.loader('open');
        $.ajax({
          url: url + 'xp.json?a='+Math.random(),
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

    var getTools = function(callBack, errorCallBack) {
      var url = configMap.url;
      //App.Util.loader('open');
      $.ajax({
        url: url + 'tools.json?a='+Math.random(),
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

    var getProjects = function(callBack, errorCallBack) {
        var url = configMap.url;
        //App.Util.loader('open');
        $.ajax({
          url: url + 'projects.json?a='+Math.random(),
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

    var getProjectDetail = function(id, callBack, errorCallBack, isDirectLink) {
        var url = configMap.url;
        //App.Util.loader('open');
        $.ajax({
          url: url + 'projects/'+id+'.json?a='+Math.random(),
          type: "GET",
          dataType: "json",
          success: function(data){
            if (typeof callBack === 'function') {
                callBack(data, id, isDirectLink);
            }
          },
          error: function(xhr){
            if (typeof errorCallBack === 'function') {
                errorCallBack(id, xhr);
            }
          }
        });
    };



    return $.extend(configMap, {
    	getHomeContents: getHomeContents,
      getExperiences: getExperiences,
      getTools: getTools,
      getProjects: getProjects,
      getProjectDetail: getProjectDetail
    }, true);


});