JJR.extend('Tools', function(App) {

    var configMap = {};

    var stateMap = {
        tools: [],
        projects: [],
        selectedTools: [],
        sort: 'desc'
    };

    var jqueryMap = {};

    var setjQueryMap = function($container) {
        jQueryMap = { 
            $container : $container
        };
        return true;
    };

    var render = function() {
        var $container = $('#tools');
        App.Model.getTools(renderTools, showError);
        App.Model.getProjects(setProjects, showError);  
    };

    var renderTools = function(data) {
        var $container = $('#tools');
        stateMap.tools = data;
        $container.html(Handlebars.Templates['tools']({'data': stateMap.tools}));      
    }
    
    var showError = function(xhr) {
        console.log('fetching tools failed');
    }

    var setProjects = function(data) {
        var isReverse = stateMap.sort === 'desc';
        stateMap.projects = isReverse ? data.reverse() : data;
    }

    var filterByCategory = function(el) {
        var $container = $('#tools');
        var tabs = $container.find('.tabs');
        var tags = $container.find('.tags');
        var category = $(el).data('category');
        var isSelected = !$(el).hasClass('selected');
        var projects = stateMap.projects;
        var isReverse = stateMap.sort === 'desc';
        var filtered = [];

        $(tags).find('.tag').removeClass('selected');
        stateMap.selectedTools = [];
        if(isSelected){
            var showTags = $(tags).find('.tag[data-category="'+category+'"]');
            var hideTags = $(tags).find('.tag').not('[data-category="'+category+'"]');

            $(tabs).find('.tab').not(this).removeClass('selected');
            $(el).addClass('selected');
            
            showTags.removeClass('hide');
            hideTags.addClass('hide');

            filtered = projects.filter(d => d.category.indexOf(category) !== -1);

            App.Projects.renderTimeline(isReverse ? filtered.reverse() : filtered);
        }else{
            $(tabs).find('.tab').removeClass('selected');
            $(el).removeClass('selected');

            $('.tags-tools .tag').removeClass('hide');
            App.Projects.renderTimeline(isReverse ? projects.reverse() : projects);
        }
    }

    var filterByTools = function(el) {
        var selection = $(el).data('tool').toUpperCase();
        var isSelected = !$(el).hasClass('selected');
        var projects = stateMap.projects;
        var isReverse = stateMap.sort === 'desc';
        var selections = stateMap.selectedTools;
        var filtered = [];
        
        if(isSelected && selection){
            if(selections.indexOf(selection) === -1){
                selections.push(selection);
                $(el).addClass('selected');
            }
        }else{
            $(el).removeClass('selected');
            selections = selections.filter(d => d !== selection);
            stateMap.selectedTools = selections;
        }

        if(selections.length){
            filtered = projects.filter((d) => {
                var matched = d.tools.filter(tool => selections.includes(tool.toUpperCase()))
                return matched.length;
            });
            
            App.Projects.renderTimeline(isReverse ? filtered.reverse() : filtered);
        }else{
            App.Projects.renderTimeline(isReverse ? projects.reverse() : projects);
        }
    }

    var bind = function() {
        var $container = $('#tools');

        $container.on('click', '.tab', function(){
            filterByCategory(this);
        });

        $container.on('click', '.tag', function(){
            filterByTools(this);
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