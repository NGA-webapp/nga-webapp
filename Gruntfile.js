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
      options: {
        livereload: true
      },
      js: {
        files: 'js/**'
      },
      less: {
        files: 'style/**.less',
        tasks: ['_css']
      },
      libs: {
        files: 'libs/**'
      }
    },
    less: {
      files: {
        "style/main.css": "style/main.less"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('_css', ['less']);
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('default', ['dev']);
};
