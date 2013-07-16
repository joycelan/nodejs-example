var path = require('path');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        express: {
			custom: {
				options: {
					server: path.resolve('./app'),
					port: 1337
				}
			}
        },
		watch: {
			options: {
				livereload: true
			},
			public: {
				files: ['./app/public/**/*'],
				livereload: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.registerTask('default', ['express', 'express-keepalive']);
};
