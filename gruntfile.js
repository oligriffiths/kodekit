module.exports = function(grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load time-grunt and all grunt plugins found in the package.json
    require('jit-grunt')(grunt);

    // grunt config
    grunt.initConfig({

        // Grunt variables
        assetsPath: 'code/resources/assets',

        // Iconfont
        webfont: {
            icons: {
                src: '<%= assetsPath %>/icons/svg/*.svg',
                dest: '<%= assetsPath %>/fonts/koowa-icons',
                destCss: '<%= assetsPath %>/scss/utilities',
                options: {
                    font: 'koowa-icons',
                    hashes: false,
                    stylesheet: 'scss',
                    relativeFontPath: '../fonts/icons/',
                    template: '<%= assetsPath %>/icons/template.css',
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
                    '<%= assetsPath %>/css/admin.css': '<%= assetsPath %>/scss/admin.scss',
                    '<%= assetsPath %>/css/bootstrap.css': '<%= assetsPath %>/scss/bootstrap.scss',
                    '<%= assetsPath %>/css/debugger.css': '<%= assetsPath %>/scss/debugger.scss',
                    '<%= assetsPath %>/css/dumper.css': '<%= assetsPath %>/scss/dumper.scss'
                }
            }
        },


        // Modernizr
        modernizr: {
            dist: {
                "cache": true,

                "dest": "<%= assetsPath %>/js/build/modernizr.js",
                "options": [
                    "html5shiv",
                    "prefixedCSS",
                    "setClasses"
                ],
                "uglify": false,
                "tests": [
                    "appearance",
                    "checked",
                    "flexbox",
                    "flexboxlegacy",
                    "flexboxtweener",
                    "flexwrap"
                ],
                "crawl" : false,
                "customTests" : []
            }
        },

        "string-replace": {
            inline: {
                files: {
                    "<%= assetsPath %>/js/build/modernizr.js": "<%= assetsPath %>/js/build/modernizr.js"
                },
                options: {
                    replacements: [
                        // place files inline example
                        {
                            pattern: "'classPrefix' : ''",
                            replacement: "'classPrefix' : 'k-'"
                        }
                    ]
                }
            }
        },


        // Concatenate files

        concat: {
            js: {
                files: {
                    '<%= assetsPath %>/js/build/admin.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/select2/dist/js/select2.full.min.js',
                        'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
                        'bower_components/footable/dist/footable.min.js',
                        'bower_components/floatThead/dist/jquery.floatThead.min.js',
                        '<%= assetsPath %>/scripts/overflowing.js',
                        '<%= assetsPath %>/scripts/tabbable.js',
                        '<%= assetsPath %>/scripts/off-canvas-menu.js',
                        '<%= assetsPath %>/scripts/main.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ],
                    '<%= assetsPath %>/js/build/jquery.js': [
                        'bower_components/jquery/dist/jquery.js',
                        '<%= assetsPath %>/js/koowa.kquery2.js'
                    ],
                    '<%= assetsPath %>/js/build/jquery.magnific-popup.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ],
                    '<%= assetsPath %>/js/build/jquery.validate.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/jquery-validation/dist/jquery.validate.js',
                        '<%= assetsPath %>/js/jquery.validate.patch.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ],
                    '<%= assetsPath %>/js/build/koowa.select2.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/select2/dist/js/select2.full.js',
                        '<%= assetsPath %>/js/koowa.select2.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ],
                    '<%= assetsPath %>/js/build/koowa.tree.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/jqtree/tree.jquery.js',
                        '<%= assetsPath %>/js/koowa.tree.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ]
                }
            }
        },

        // Uglify
        uglify: {
            options: {
                sourceMap: true,
                preserveComments: 'some' // preserve @license tags
            },
            build: {
                files: {
                    '<%= assetsPath %>/js/min/admin.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/select2/dist/js/select2.full.min.js',
                        'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
                        'bower_components/footable/dist/footable.min.js',
                        'bower_components/floatThead/dist/jquery.floatThead.min.js',
                        '<%= assetsPath %>/scripts/overflowing.js',
                        '<%= assetsPath %>/scripts/tabbable.js',
                        '<%= assetsPath %>/scripts/off-canvas-menu.js',
                        '<%= assetsPath %>/scripts/main.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ],
                    '<%= assetsPath %>/js/min/bootstrap.js': [
                        '<%= assetsPath %>/js/bootstrap.js'
                    ],
                    '<%= assetsPath %>/js/min/jquery.js': [
                        'bower_components/jquery/dist/jquery.js',
                        '<%= assetsPath %>/js/koowa.kquery2.js'
                    ],
                    '<%= assetsPath %>/js/min/jquery.magnific-popup.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ],
                    '<%= assetsPath %>/js/min/jquery.validate.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/jquery-validation/dist/jquery.validate.js',
                        '<%= assetsPath %>/js/jquery.validate.patch.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ],
                    '<%= assetsPath %>/js/min/koowa.js': [
                        '<%= assetsPath %>/js/koowa.js'
                    ],
                    '<%= assetsPath %>/js/min/koowa.datepicker.js': [
                        '<%= assetsPath %>/js/datepicker.js',
                        '<%= assetsPath %>/js/koowa.datepicker.js'
                    ],
                    '<%= assetsPath %>/js/min/koowa.select2.js': [
                        '<%= assetsPath %>/js/select2.js',
                        '<%= assetsPath %>/js/koowa.select2.js'
                    ],
                    '<%= assetsPath %>/js/min/koowa.tree.js': [
                        '<%= assetsPath %>/js/kquery.set.js',
                        'bower_components/jqtree/tree.jquery.js',
                        '<%= assetsPath %>/js/koowa.tree.js',
                        '<%= assetsPath %>/js/kquery.unset.js'
                    ],
                    '<%= assetsPath %>/js/min/modernizr.js': [
                        '<%= assetsPath %>/js/build/modernizr.js'
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
                    '<%= assetsPath %>/icons/svg/*.svg'
                ],
                tasks: ['webfont', 'sass', 'autoprefixer'],
                options: {
                    interrupt: true,
                    atBegin: false
                }
            },
            sass: {
                files: [
                    '<%= assetsPath %>/scss/*.scss',
                    '<%= assetsPath %>/scss/**/*.scss'
                ],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            javascript: {
                files: [
                    '<%= assetsPath %>/scripts/*.js',
                    '<%= assetsPath %>/js/*.js',
                    '!<%= assetsPath %>/js/min/*.js'
                ],
                tasks: ['uglify', 'concat'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            concat: {
                files: [
                    '<%= assetsPath %>/scripts/*.js',
                    '<%= assetsPath %>/js/*.js',
                    '!<%= assetsPath %>/js/min/*.js'
                ],
                tasks: ['concat'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        }


    });

    // The dev task will be used during development
    grunt.registerTask('javascript', ['modernizr', 'string-replace', 'uglify', 'concat']);
    grunt.registerTask('default', ['shell', 'watch']);

};