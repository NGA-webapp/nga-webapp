module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      client: {
        options: {
          port: 8002,
          base: '.'
        }
      }
    },
    watch: {
      js: {
        files: 'js/**/**',
        options: {
          livereload: true
        }
      },
      less: {
        files: 'style/**/**.less',
        tasks: ['_css']
      },
      css: {
        files: 'style/main.css',
        options: {
          livereload: true
        }
      },
      libs: {
        files: 'libs/**',
        options: {
          livereload: true
        }
      }
    },
    less: {
      defaults: {
        files: {
          "style/main.css": "style/main.less"
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:8002'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('_css', ['less']);
  grunt.registerTask('dev', ['connect', 'open:dev', 'watch']);
  grunt.registerTask('default', ['dev']);
};
