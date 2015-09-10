module.exports = function(grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load time-grunt and all grunt plugins found in the package.json
    require('jit-grunt')(grunt);

    // grunt config
    grunt.initConfig({

        // Grunt variables
        assetsPath: '<%= assetsPath %>',

        // Iconfont
        webfont: {
            icons: {
                src: '<%= assetsPath %>/new-ui/icons/svg/*.svg',
                dest: '<%= assetsPath %>/fonts/koowa-icons',
                destCss: '<%= assetsPath %>/new-ui/scss/utilities',
                options: {
                    font: 'koowa-icons',
                    hashes: false,
                    stylesheet: 'scss',
                    relativeFontPath: '../fonts/icons/',
                    template: '<%= assetsPath %>/new-ui/icons/template.css',
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
                    '<%= assetsPath %>/css/admin.css': '<%= assetsPath %>/new-ui/scss/admin.scss'
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
                    '<%= assetsPath %>/js/admin.js': [
                        'bower_components/select2/dist/js/select2.full.min.js',
                        'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
                        'bower_components/footable/dist/footable.min.js',
                        'bower_components/floatThead/dist/jquery.floatThead.min.js',
                        '<%= assetsPath %>/new-ui/scripts/overflowing.js',
                        '<%= assetsPath %>/new-ui/scripts/tabbable.js',
                        '<%= assetsPath %>/new-ui/scripts/off-canvas-menu.js',
                        '<%= assetsPath %>/new-ui/scripts/main.js'
                    ],
                    '<%= assetsPath %>/js/modernizr.js': [
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
                src: '<%= assetsPath %>/css/*.css',
                dest: '<%= assetsPath %>/css/'
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
                    '<%= assetsPath %>/new-ui/icons/svg/*.svg'
                ],
                tasks: ['webfont', 'sass', 'autoprefixer'],
                options: {
                    interrupt: true,
                    atBegin: false
                }
            },
            sass: {
                files: [
                    '<%= assetsPath %>/new-ui/scss/*.scss',
                    '<%= assetsPath %>/new-ui/scss/**/*.scss'
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
                    '<%= assetsPath %>/new-ui/scripts/*.js'
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
    grunt.registerTask('default', ['shell', 'watch']);

};