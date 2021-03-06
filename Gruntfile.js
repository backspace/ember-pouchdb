module.exports = function(grunt) {
	// Load grunt-microlib config & tasks
	var emberConfig = require('grunt-microlib').init.bind(this)(grunt);
	grunt.loadNpmTasks('grunt-microlib');

	grunt.registerTask('build', "Builds a distributable version of <%= cfg.name %>, without naming the file with a version",
		[ 'clean', 'transpile:amd', 'concat:amdNoVersion', 'concat:browser', 'browser:distNoVersion', 'uglify:browserNoVersion' ]);
									
	grunt.registerTask('test', "Run your apps's tests once. Uses Google Chrome by default. Logs coverage output to tmp/public/coverage.", 
		[ 'browserify:tests', 'karma:test' ]);

	grunt.registerTask('release', function(versionType){
		if (typeof versionType === 'undefined') versionType = 'patch'
		grunt.task.run(['build','test','bump:'+versionType])
	});

	var config = {
	  cfg: {
	    name: 			'ember-pouchdb',
	    barename: 	'ember-pouchdb',
	    namespace: 	'EPDB'
	  },
	  env: 				process.env,
	  pkg: 				grunt.file.readJSON('bower.json'),
		bump: 			require('./options/bump'),
	  browser: 		require('./options/browser'),
	  browserify: require('./options/browserify'),
	  karma: 			require('./options/karma')
	};

	// Merge config into emberConfig, overwriting existing settings
	grunt.initConfig(grunt.util._.merge(emberConfig, config));

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-bump');	
	grunt.loadNpmTasks('grunt-shell');		
};
