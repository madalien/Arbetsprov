module.exports = function(grunt) {
    //Project config 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Define Reusable paths.
        paths: {
            app: 'app',
            app_css: '<%= paths.app %>/css',
            app_js: '<%= paths.app %>/js',
            scss_src: '<%= paths.app %>/src/scss',
            js_src: '<%= paths.app %>/src/js',
            bower_src: '<%= paths.app %>/src/bower',
            dist: 'dist',
            dist_css: '<%= paths.dist %>/css',
            dist_js: '<%= paths.dist %>/js'
        },
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: false
                },
                files: {
                    '<%= paths.app_css %>/app.css': '<%= paths.scss_src %>/hub.scss'
                }
            },
            build: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false
                },
                files: {
                    '<%= paths.dist_css %>/app.css': '<%= paths.scss_src %>/hub.scss'
                }
            }
        },
        browserSync: {
            files: {
                src: ['<%= paths.app %>/*.css', '<%= paths.app %>/*.html', '<%= paths.app %>/*.js']
            },
            options: {
                browser: 'Chrome',
                server: '<%= paths.app %>',
                watchTask: true
            }
        },
        watch: {
            sass: {
                files: ['<%= path.scss_src %>/*.scss'],
                tasks: ['sass:dev']
            },
            js: {
                files: ['<%= paths.js_src %>/*.js'],
                tasks: ['jshint', 'uglify:dev']
            }
        },
        jshint: {
            dev: {
                files: {
                    src: '<%= paths.js_src %>*.js'
                }
            }
        },

        bower: {
            dev: {
                dest: '<%= paths.bower_src %>',
                js_dest: '<%= paths.bower_src %>/js',
                css_dest: '<%= paths.bower_src %>/css'

            }
        },

        uglify: {
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    preserveComments: 'all'
                },
                src: ['<%= paths.js_src %>/*.js', '<%= paths.bower_src %>/js/**/*.js'],
                dest: '<%= paths.app_js %>/app.js'
            },
            build: {
                options: {
                    compress: true,
                },
                src: ['<%= paths.bower_src %>/js/**/*.js', '<%= paths.js_src %>/*.js'],
                dest: '<%= paths.dist_js %>/app.min.js'
            }
        },

        copy: {
            html: {
                expan: true,
                cwd: '<%= paths.app %>/',
                src: 'index.html',
                dest: '<%= paths.dist %>',
                options: {
                    process: function(content, srcpath) {
                        return content.replace('app.js', 'app.min.js');
                    }
                }
            }
        },
        clean: {
            dist: {
                src: '<%= paths.dist %>',
            }
        }
    });

    //Load the Plugins:-----------------------------------------------------------

    // BrowserSync.
    grunt.loadNpmTasks('grunt-browser-sync');

    // Sass.
    grunt.loadNpmTasks('grunt-sass');

    //watch
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //Bower
    grunt.loadNpmTasks('grunt-bower');

    //grunt-contrib-uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt-contrib-copy
    grunt.loadNpmTasks('grunt-contrib-copy');

    //grunt-contrib-clean
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Tasks: --------------------------------------------------------------------- 

    //Default task.
    grunt.registerTask('default', ['browserSync', 'watch']);

    grunt.registerTask('build', ['clean:dist', 'copy', 'uglify:build', 'sass:build']);

};