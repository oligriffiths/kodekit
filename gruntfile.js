module.exports = function(grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load time-grunt and all grunt plugins found in the package.json
    require('jit-grunt')(grunt);

    // grunt config
    grunt.initConfig({

        // Iconfont
        webfont: {
            icons: {
                src: 'code/resources/assets/new-ui/icons/svg/*.svg',
                dest: 'code/resources/assets/fonts/koowa-icons',
                destCss: 'code/resources/assets/new-ui/scss/utilities',
                options: {
                    font: 'koowa-icons',
                    hashes: false,
                    stylesheet: 'scss',
                    relativeFontPath: '../fonts/icons/',
                    template: 'code/resources/assets/new-ui/icons/template.css',
                    htmlDemo: false
                }
            }
        },


        // Compile sass files
        sass: {
            options: {
                outputStyle: 'compact'
            },
            dist: {
                files: {
                    'code/resources/assets/css/admin-default.css': 'code/resources/assets/new-ui/scss/admin-default.scss',
                    'code/resources/assets/css/admin-joomla.css': 'code/resources/assets/new-ui/scss/admin-joomla.scss',
                    'code/resources/assets/css/admin-wordpress.css': 'code/resources/assets/new-ui/scss/admin-wordpress.scss'
                }
            }
        },


        // Browser Sync
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        "code/resources/assets/css/*.*",
                        "code/resources/assets/js/*.*",
                        "code/resources/assets/documentation/*.*"
                    ]
                },
                options: {
                    proxy: "todo.dev",
                    port: 1338,
                    open: true,
                    notify: false,
                    watchTask: true,
                    injectChanges: false
                }
            }
        },


        // Uglify
        uglify: {
            options: {
                soureMap: true
            },
            build: {
                files: {
                    'code/resources/assets/js/admin.js': [
                        'bower_components/select2/dist/js/select2.full.min.js',
                        'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
                        'bower_components/footable/dist/footable.min.js',
                        'bower_components/floatThead/dist/jquery.floatThead.min.js',
                        'code/resources/assets/new-ui/scripts/overflowing.js',
                        'code/resources/assets/new-ui/scripts/tabbable.js',
                        'code/resources/assets/new-ui/scripts/off-canvas-menu.js',
                        'code/resources/assets/new-ui/scripts/main.js'
                    ],
                    'code/resources/assets/js/modernizr.js': [
                        'bower_components/modernizr/modernizr.js'
                    ]
                }
            }
        },


        // Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['> 5%', 'last 2 versions', 'ie 11', 'ie 10', 'ie 9']
            },
            files: {
                expand: true,
                flatten: true,
                src: 'code/resources/assets/css/*.css',
                dest: 'code/resources/assets/css/'
            }
        },


        // Shell commands
        shell: {
            updateCanIUse: {
                command: 'npm update caniuse-db'
            }
        },


        // Watch files
        watch: {
            fontcustom: {
                files: [
                    'code/resources/assets/new-ui/icons/svg/*.svg'
                ],
                tasks: ['webfont', 'sass', 'autoprefixer'],
                options: {
                    interrupt: true,
                    atBegin: false
                }
            },
            sass: {
                files: [
                    'code/resources/assets/new-ui/scss/*.scss',
                    'code/resources/assets/new-ui/scss/**/*.scss'
                ],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            uglify: {
                files: [
                    // Including
                    'code/resources/assets/new-ui/scripts/*.js'
                ],
                tasks: ['uglify'],
                options: {
                    interrupt: true,
                    atBegin: false
                }
            }
        }


    });

    // The dev task will be used during development
    grunt.registerTask('default', ['shell', 'browserSync', 'watch']);

};