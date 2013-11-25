module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: ['test/index.html']
    },
    jscoverage: {
      options: {
        inputDirectory: 'libs',
        outputDirectory: 'libs-cov'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks("grunt-jscoverage");

  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('cov', ['jscoverage']);
};
