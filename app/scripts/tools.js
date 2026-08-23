JJR.extend('Tools', function(App) {

    var configMap = {};

    var stateMap = {
        tools: [],
        projects: [],
        selectedTools: [],
        sort: 'desc',
        searchQuery: ''
    };

    var jqueryMap = {};

    var setjQueryMap = function($container) {
        jqueryMap = { 
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

    var applyToolVisibility = function() {
        var $container = $('#tools');
        var $selectedTab = $container.find('.tab.selected');
        var category = $selectedTab.length ? $selectedTab.data('category') : null;
        var query = (stateMap.searchQuery || '').toLowerCase().trim();

        $container.find('.tags-tools .tag').each(function() {
            var $tag = $(this);
            var tagCategory = $tag.data('category');
            var toolName = ($tag.data('tool') || '').toString().toLowerCase();

            var matchesCategory = !category || tagCategory === category;
            var matchesSearch = !query || toolName.indexOf(query) !== -1;

            if (matchesCategory && matchesSearch) {
                $tag.removeClass('hide');
            } else {
                $tag.addClass('hide');
            }
        });
    };

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

        if (isSelected) {
            $(tabs).find('.tab').not(el).removeClass('selected');
            $(el).addClass('selected');

            filtered = projects.filter(d => d.category.indexOf(category) !== -1);
            App.Projects.renderTimeline(isReverse ? filtered.reverse() : filtered);
        } else {
            $(tabs).find('.tab').removeClass('selected');
            $(el).removeClass('selected');

            App.Projects.renderTimeline(isReverse ? projects.reverse() : projects);
        }

        applyToolVisibility();
    };

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
    };

    var onSearchInput = function(e) {
        var $input = $(this);
        var $container = $('#tools');
        var $clearBtn = $container.find('.tools-search-clear');
        var val = $input.val();

        stateMap.searchQuery = val;

        if (val.length > 0) {
            $clearBtn.addClass('visible');
        } else {
            $clearBtn.removeClass('visible');
        }

        applyToolVisibility();
    };

    var onClearSearch = function(e) {
        if (e) {
            e.preventDefault();
        }
        var $container = $('#tools');
        var $input = $container.find('.tools-search-input');
        var $clearBtn = $container.find('.tools-search-clear');

        $input.val('');
        stateMap.searchQuery = '';
        $clearBtn.removeClass('visible');
        applyToolVisibility();
        $input.focus();
    };

    var bind = function() {
        var $container = $('#tools');

        $container.on('click', '.tab', function(){
            filterByCategory(this);
        });

        $container.on('click', '.tag', function(){
            filterByTools(this);
        });

        $container.on('input keyup', '.tools-search-input', onSearchInput);

        $container.on('keydown', '.tools-search-input', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                onClearSearch(e);
            }
        });

        $container.on('click', '.tools-search-clear', onClearSearch);
    };

    var load = function($container) {    
        render();
        bind();
    };

    return {
        load: load
    }

});