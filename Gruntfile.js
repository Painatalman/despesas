/*global module:false*/
module.exports = function( grunt) {
    'use strict';

    

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                tasks: ['sass']
            },
            minstyles: {
                files: ['<%= pkg.folders.public %>/<%= pkg.folders.styles %>/*.css', '<%= pkg.folders.public %>/<%= pkg.folders.styles %>/!*.min.css'],
                tasks: ['cssmin']
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
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-bootlint');

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
