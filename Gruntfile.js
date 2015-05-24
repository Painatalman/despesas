/*global module:false*/
module.exports = function( grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        meta: {
            version: "0.1.2"
        },
        pkg: grunt.file.readJSON("package.json"),
        notify_hooks: {
            options: {
                enabled: true,
                // max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: "Lord Batman", // defaults to the name in package.json, or will use project directory's name
                success: true, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },
        groc: {
            // groc documentation
            options: {
                "out": '<%= pkg.folders.docs %>'
            },
            styles: [
                '<%= pkg.folders.public %>/<%= pkg.folders.styles %>/<%= pkg.folders.styles_scss %>/' + "**/*.scss", "!vendor/**/*.scss", "*.md"
            ],
            scripts: [
                '<%= pkg.folders.public %>/<%= pkg.folders.scripts %>/' + "**/*.js", "*.md"
            ],
            templates: [
            ]
        },
        imagemin: {
            all: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    // Set to true to enable the following options…
                    expand: true,
                    // cwd is 'current working directory'
                    src: ['<%= pkg.folders.public %>/**/*.png', '<%= pkg.folders.public %>/**/*.jpg','<%= pkg.folders.uploads %>/**/*.jpg','<%= pkg.folders.uploads %>/**/*.png'],
                    // Could also match cwd line above. i.e. project-directory/img/
                    // dest: IMAGES,
                }]
            }
        },
        sass: {
            dist: { // Target
                options: { // Target options
                    style: 'expanded',
                    sourcemap: 'auto',
                    update: true,
                    debugInfo: true,
                    compass: true
                },
                files: [{ // Dictionary of files
                    expand: true,
                    cwd: '<%= pkg.folders.public %>/<%= pkg.folders.styles %>/<%= pkg.folders.styles_scss %>',
                    src: ['**/*.scss'],
                    dest: '<%= pkg.folders.public %>/<%= pkg.folders.styles %>',
                    ext: '.css'
                }]
            }
        },
        shell: {
            mongo: {
                command: 'mongod',
                options: {
                    async: true,
                }
            },
            run: {
                command: 'npm start',
                options: {
                    async: true,
                }
            },
            options: {
                stdout: true,
                stderr: true,
                failOnError: true
            }
        },
        cssmin: {
            def: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.folders.public %>/<%= pkg.folders.styles %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= pkg.folders.public %>/<%= pkg.folders.styles %>/<%= pkg.folders.styles_min %>',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            options: {
                dateFormat: function (time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                },
                livereload: true,
            },
            styles: {
                files: ['<%= pkg.folders.public %>/<%= pkg.folders.styles %>/<%= pkg.folders.styles_scss %>/**/*.scss'],
                tasks: ['sass'],
                options: {
                  livereload: true,
                },
            },
            minstyles: {
                files: ['<%= pkg.folders.public %>/<%= pkg.folders.styles %>/*.css', '<%= pkg.folders.public %>/<%= pkg.folders.styles %>/!*.min.css'],
                tasks: ['cssmin']
            },
            minimages: {
                files: ['<%= pkg.folders.public %>/**/*.png', '<%= pkg.folders.public %>/**/*.jpg','<%= pkg.folders.uploads %>/**/*.jpg','<%= pkg.folders.uploads %>/**/*.png'],
                tasks: ['imagemin']
            },
            docsScripts: {
                files: ['<%= pkg.folders.public %>/<%= pkg.folders.scripts %>/' + "**/*.js","!vendor/**/*.js"],
                tasks: ["groc:scripts"],
            },
            // scripts: {
            //     files: ['**/*.js'],
            //     tasks: ['jshint'],
            //     options: {
            //         spawn: false,
            //     },
            // },
        }
    });

    // These plugins provide necessary tasks.
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-bootlint');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-notify");
    grunt.loadNpmTasks("grunt-groc");

    // This is required if you use any options.
    grunt.task.run("notify_hooks");

    // Default task.
    grunt.registerTask('default', ['shell:mongo','shell:run','watch']);

    // Custom Events
    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    grunt.event.on('sass:dist', function (action, filepath, target) {
        grunt.log.writeln(filepath);
        grunt.log.writeln('New clothes, Lord Batman?');
    });

    grunt.event.on('cssmin:def', function () {
        grunt.log.writeln('Final tweaks, Lord Batman!');
    });

};
