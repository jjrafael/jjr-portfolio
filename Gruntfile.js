'use strict';


module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'build',
        internal: false
    };

    // proxy for Grunt server
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

    // modrewrite for Grunt server
    var rewrite = require('connect-modrewrite');

    // get project settings
    // var pkg = grunt.file.readJSON('package.json');



    // get proxy settings
    var settings = {};

    if (grunt.file.exists('settings.json')) {
        settings = grunt.file.readJSON('settings.json');
    } else {
        settings = {
            'connect' : 7070,
            'hostname' : 'localhost'
        };
    }


    require('load-grunt-tasks')(grunt);


    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {

            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/**/*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/**/*.html',
                    '.tmp/styles/**/*.css',
                    '<%= config.app %>/images/**/*',
                    '<%= config.app %>/scripts/*.js'
                ]
            },
            handlebars: {
                files: ['<%= config.app %>/templates/*.handlebars'],
                tasks: ['handlebars:all']
            }
        },

        // Grunt Server Settings
        //----------------------------------------------------
        connect: {
            options: {
                port: settings.connect,
                open: settings.browser,
                livereload: 35729,
                hostname: settings.hostname
            },
            livereload: {
                options: {
                    middleware: function(connect) {

                        // the rules that shape our mod-rewrite behavior
                        var rules = [ '!\/abp\/m+|\/vbl+|\/vfl+|\/vhc+|\/vdr+|\/vto+|\/rss-+|\/api\/+|\\.html|\\.js|\\.css|\\.map|\\.svg|\\.jp(e?)g|\\.png|\\.gif|\\.eot|\\.ttf|\\.woff|\\.aac|\\.ogg|\\.mp3|\\.swf|\\.pdf|\\.ico|\\.appcache$ /index.html'];

                        return [
                            rewrite(rules),
                            connect.static('.tmp'),
                            // connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app),
                            proxySnippet
                        ];
                    }
                }

            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }

        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: ['.sass-cache','.tmp', '<%= config.app %>/scripts/templates.js', '<%= config.dist %>']
        },



        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/**/*.js',
                '!<%= config.app %>/scripts/vendor/*',
                '!<%= config.app %>/scripts/templates.js',
                '!<%= config.app %>/scripts/mify.js', // ignore third party MIFY
                '!<%= config.app %>/scripts/dummy.js', // ignore third party DUMMY
            ]
        },


        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/scripts/**/*.js',
                    '<%= config.dist %>/styles/**/*.css',
                    // '<%= config.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    // '<%= config.dist %>/css/fonts/*',
                    // '!<%= config.dist %>/images/ignore/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        /*
        // Replace references to the images in the compiled js and css files, and the html views
        filerev_replace: {
            options: {
                assets_root: '<%= config.app %>/styles/'
            },
            compiled_assets: {
                src: '.tmp/styles/*.{css,js}'
            },
            views: {
                options: {
                    views_root: '<%= config.dist %>/styles/'
                },
                src: '<%= config.dist %>/index.html'
            }
        },
        */

        'filerev_assets': {
            dist: {
                options: {
                    dest: '<%= config.dist %>/assets.json',
                    cwd: '<%= config.dist %>/',
                    prefix: ''
                }
            }
        },

        // filerev: {
        //     options: {
        //         algorithm: 'md5',
        //         length: 8
        //     },
        //     scripts: {
        //         src: '<%= config.app %>/scripts/**/*.js'
        //     },
        //     styles: {
        //         src: '<%= config.app %>/styles/**/*.css'

        //     }
        // },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                // sourcemap: 'none'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['main.scss'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['main.scss'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/*.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/styles',
                    '<%= config.dist %>/scripts'

                ]
            },
            html: ['<%= config.dist %>/**/*.html'],
            css: ['<%= config.dist %>/styles/**/*.css']
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: false,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '**/*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt,htaccess,swf}',
                        'images.json',
                        'json/**/*',
                        'assets/**/*',
                        '**/*.html',
                        'styles/fonts/**/*.*',
                        'scripts/**/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: [
                        '**/*.css',
                        'fonts/**/*.*',
                        // 'scripts/**/*'
                    ]

            }
        },

        // Run some tasks in parallel to speed up build process
        // concurrent: {
        //     develop: [
        //         'sass:develop',
        //         'copy:styles'
        //     ]
        // },

        // Precompile Handlebars Templates

        handlebars: {
            options: {
                namespace: 'Handlebars.Templates',
                processName: function(filePath){
                    var pre = new RegExp( '^'+config.app+'\/templates\/');
                    return filePath.replace(pre,'').replace(/\.handlebars$/,'');
                }
            },
            all: {
                files: {
                    '<%= config.app %>/scripts/templates.js':['<%= config.app %>/templates/**/*.handlebars']
                }
            }
        },
        
        cssmin: {
          dist: {
            files: {
              '<%= config.dist %>/styles/main.css': [
                '.tmp/styles/main.css'
              ]
            }
          }
        },





    });




    grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target,build) {
        config.internal = grunt.option('internal') || false;
        grunt.task.run([
            'clean:server',
            'configureProxies:livereload',
            'handlebars',
            'sass:server',
            'copy:styles',
            'autoprefixer',
            'connect:livereload',

            'watch',
        ]);
    });

    grunt.registerTask('build', 'Used for development environment',function(build){

        config.internal = grunt.option('internal') || false;

        grunt.config.merge({
            uglify:{
                options: {
                    mangle: false,
                    beautify: true,
                    compress: {
                        // 'drop_console': true // <-
                    }
                }
            }
        });
        grunt.task.run([
            'clean:dist',
            // 'jshint',
            'useminPrepare',
            'handlebars',
            'sass',
            'copy:styles',
            // 'imagemin',
            // 'svgmin',
            'autoprefixer',
            'concat',
            'cssmin',
            'uglify',
            'filerev',
            'filerev_assets',
            'copy:dist',

            // 'modernizr',
            // 'rev',
            'usemin',
            'htmlmin'
        ]);

    });

    grunt.registerTask('default', function() {
        grunt.log('Please use `grunt serve` or `grunt build` to use grunt');
    });

};
