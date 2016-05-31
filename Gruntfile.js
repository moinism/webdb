
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['webdb.js']
    },
    uglify: {
      options: {
        banner: '/*\n  <%= pkg.name %>.js v<%= pkg.version %> file generated on <%= grunt.template.today() %> \n  (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> \n  Available under MIT license - <%= pkg.homepage %> \n*/\n\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.registerTask('default', [
      'uglify',
      'jshint'
    ]);
};
