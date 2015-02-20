module.exports = function(grunt){
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // require it at the top and pass in the grunt instance
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({ 

    jshint: {
      ignore_warning: {
        options: {
          '-W083': true,
        },
        src: [
          'src/js/nomDuFichier.js'
        ],
      },
    },

    uglify: {
      options: { 
        banner: '/\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n/\n' 
      },
      dist: {
        files: {
          'dist/js/nomDuFichierFinal.min.js': [
            'src/js/nomDuFichier1.js', 
            'src/js/nomDuFichier2.js'
          ]
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expand',
          sourcemap: 'none'
        },
        files: {
          'dist/css/siteName.styles.css': 'src/sass/siteName.styles.scss'
        }
      }
    },

    cssmin: {
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['siteName.styles.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.styles.min.css'
      }
    },

    imagemin: {                          // Task 
      dist: {                            // Another target 
        files: [{
          expand: true,                  // Enable dynamic expansion 
          cwd: 'src/',                   // Src matches are relative to this path 
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
          dest: 'dist/'                  // Destination path prefix 
        }]
      }
    },

    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['jshint', 'uglify' ],
        options: {
          spawn: false,
        },
      },
      css: {
        files: 'src/sass/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
    }

  });


  // ========= // CREATE TASKS =========

  // this default task will go through all configuration (dev and production) in each task 
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'sass', 'imagemin']);

};