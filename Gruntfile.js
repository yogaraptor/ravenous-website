var jade = require('jade');
var md = require('node-markdown').Markdown;

module.exports = function(grunt) {

	///////////////////////////////////////////////////////////////////////////////
	// ENVIRONMENT SETUP
	///////////////////////////////////////////////////////////////////////////////
	// Define variables per environment
	var buildConfig = {
		dev: {
			dest: 'public',
			jsTasks: ['jshint', 'copy:js'],
			sassOutputStyle: 'expanded'
		},
		release: {
			dest: 'public',
			jsTasks: ['jshint', 'requirejs'],
			sassOutputStyle: 'compressed'
		}
	};

	// Get requested environment
	var buildType = grunt.option('env');

	var env;
	if (buildType !== 'dev' && buildType !== 'release') {
		// No environment specified, use dev
		buildType = 'dev';
	}
	env = buildConfig[buildType];
	console.log('env', env.dest)

	///////////////////////////////////////////////////////////////////////////////
	// ACE Component Task setup
	///////////////////////////////////////////////////////////////////////////////	

	/**
	 * {Array}
	 * List of all files (require modules) representing user's components
	 */
	var jsFiles = grunt.file.expand(["src/atoms/**/*.js", "src/molecules/**/*.js", "src/organisms/**/*.js", "src/templates/**/*.js", "src/pages/**/*.js"]);
	/**
	 * {Array}
	 * List of user components, formatted for use as requireJS dependencies
	 */
	var componentsList = [];
	// Loop over files to create componentList
	for(i=0;i<jsFiles.length;i++){
		var fileName;
		// Depending on environment (dev or release) the dependency paths will be different
		if (buildType == 'dev') {
			// Dev, strip path and .js extension
			var slashSeperatedFile = jsFiles[i].split("/");
			fileName = slashSeperatedFile.pop();
			fileName = fileName.substring(0, fileName.length-3);
		} else if (buildType == 'release') {
			// Release, include corrected path (replace leading src/ with ../) and strip .js extension
			fileName = '../' + jsFiles[i].substring(4, jsFiles[i].length - 3);
		}
		// Add component dependency to list
		componentsList.push(fileName);
	}

	// Write component dependency file for require to read in at runtime (dev) or build time (release)
	if (buildType == 'dev') {
		grunt.file.write(env.dest+"/js/componentList.json", JSON.stringify(componentsList));
	} else if (buildType == 'release') {
		grunt.file.write("src/global-js/componentList.json", JSON.stringify(componentsList));
	}

	///////////////////////////////////////////////////////////////////////////////
	// DEPENDENCIES & TASK SETUP
	///////////////////////////////////////////////////////////////////////////////
	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),
	};

	// JS linting
	gruntConfig.jshint = {
		files: ['gruntfile.js', 'src/**/**/*.js'],
		options: {
			globals: {
				jQuery: true,
				console: true,
				module: true,
				document: true
			},
			ignores: [
				'src/global-js/r.js',
				'src/global-js/vendor/**/*.js',
				'src/global-js/ie/*.js'
			]
		}
	};

	// RequireJS build (release only)
	/**
	 * {Array}
	 * List of requireJS modules to pass in to build as explicit dependencies
	 */
	var explicitDependencies;
	explicitDependencies = componentsList.slice(0); // Clone user components array
	explicitDependencies.push('vendor/almond'); // Add almond AMD loader
	explicitDependencies.push('main'); // Add main script (TODO this seems odd - shouldn't have to include this explicitly)
	gruntConfig.requirejs = {
		compile: {
			options: {
				baseUrl: 'src/global-js',
				findNestedDependencies: 'true',
				include: explicitDependencies,
				mainConfigFile: "src/global-js/main.js",
				out: env.dest+'/js/<%= pkg.name %>.min.js',
				paths: {
					'jquery':			'vendor/jquery',
					'text':				'vendor/require-text',
					'html5shiv':		'ie/html5shiv'
				}
			}
		}
	};

	var jadeVars = {
		env: buildType,
		pkg: {
			name: '<%= pkg.name %>'
		},
		aceConfig: grunt.file.readJSON('ace_config.json'),
	};
	var contentFiles = grunt.file.expand('content/*.json');
	contentFiles.forEach(function (file, i) {
		var content = grunt.file.readJSON(file);
		if (file == 'content/projects.json') {
			// Read in project descriptions from md files
			content = content.map(function (project) {
				project.content = md(grunt.file.read('content/'+project.file));
				return project;
			});
		}

		var key = file.split('/').pop().replace('.json', '');
		jadeVars[key] = content;
	});

	if(buildType == "dev"){
		// Jade => HTML
		gruntConfig.jade = {
			compile: {
				options: {
					pretty: true,
					data: jadeVars
				},
				files: [
					{
						expand: true,
						cwd: 'src/',
						dest: env.dest,
						src: ['**/**/*.jade'],
						ext: '.html'
					}
				],
			}
		};

	}else{

		// Jade => HTML
		gruntConfig.jade = {
			compile: {
				options: {
					pretty: true,
					data: jadeVars
				},
				files: [
					{
						expand: true,
						flatten: true,
						cwd: 'src/',
						dest: env.dest,
						src: ['pages/**/*.jade'],
						ext: '.html'
					}
				],
			}
		};

	}


	// SASS => CSS
	gruntConfig.compass = {
		dist: {
			options: {
				require: [
					'sass-globbing'
				],
				imagesDir: 'src/img',
				sassDir: 'src/global-scss/',
				cssDir: env.dest+'/css',
				outputStyle: env.sassOutputStyle,
				relativeAssets: false
			}
		}
	};

	// Replace REM with px
	gruntConfig.remfallback= {
		options: {
			log: false,
			replace: false
		},
		your_target: {
			files: {}
		}
	};
	gruntConfig.remfallback.your_target.files[env.dest+'/css/main.css'] = [env.dest+'/css/main.css'];

	// Auto-prefixing for CSS3 etc
	gruntConfig.autoprefixer = {
		options: {
		// Task-specific options go here.
		},

		// prefix the specified file
		single_file: {
			options: {
				// Target-specific options go here.
			},
			src: env.dest+'/css/main.css',
			dest: env.dest+'/css/main.css'
		},
	};

	// Optimise bitmaps
	gruntConfig.imagemin = {
		dynamic: { 
			files: [{
				expand: true,
				cwd: 'src/img',
				src: ['*.{png,jpg,gif}'],
				dest: env.dest+'/img/'
			},
			{
				expand: true,
				cwd: 'src/content',
				src: ['**/*.{png,jpg,gif}'],
				dest: env.dest+'/content/'
			}]
		}
	}

	// Optimise SVGs
	gruntConfig.svgmin = {
		dist: {
			options: {
				plugins: [
					{
						convertPathData: {
							applyTransforms: false,
							applyTransformsStroked: true,
							straightCurves: true,
							lineShorthands: true,
							curveSmoothShorthands: true,
							floatPrecision: 1,
							removeUseless: true,
							collapseRepeated: true,
							utilizeAbsolute: true,
							leadingZero: true,
							negativeExtraSpace: true
						}
					}
				]
			},
			files: [{
				expand: true,
				cwd: 'src/img',
				src: ['*.svg'],
				dest: env.dest+'/img/'
			},
			{
				expand: true,
				cwd: 'src/content',
				src: ['**/*.svg'],
				dest: env.dest+'/content/'
			}]
		}
	};



	// Asset copying
	gruntConfig.copy = {
		fonts: {
			files: [
				{expand: true, cwd: 'src/fonts', src: ['**'], dest: env.dest+'/fonts', filter: 'isFile'}
			]
		},
		content: {
			files: [
				{expand: true, cwd: 'src/content', src: ['**'], dest: env.dest+'/content', filter: 'isFile'}
			]
		},
		img: {
			files: [
				{expand: true, cwd: 'src/img', src: ['**'], dest: env.dest+'/img', filter: 'isFile'}
			]
		},
		video: {
			files: [
				{expand: true, cwd: 'src/video', src: ['**'], dest: env.dest+'/video'}
			]					
		},
		js: {
			files: [
				{expand: true, flatten: true, cwd: 'src/atoms', src: ['**/*.js'], dest: env.dest+'/js'},
				{expand: true, flatten: true, cwd: 'src/molecules', src: ['**/*.js'], dest: env.dest+'/js'},
				{expand: true, flatten: true, cwd: 'src/organisms', src: ['**/*.js'], dest: env.dest+'/js'},
				{expand: true, flatten: true, cwd: 'src/templates', src: ['**/*.js'], dest: env.dest+'/js'},
				{expand: true, flatten: true, cwd: 'src/pages', src: ['**/*.js'], dest: env.dest+'/js'},
				{expand: true, flatten: false, cwd: 'src/global-js', src: ['**/*.js'], dest: env.dest+'/js'}
			]
		},
		jade: {
			files: [
				{expand: true, cwd: 'src', src: ['**/*jade'], dest: 'views'}
			]
		},
	};

	// Task watching
	gruntConfig.watch = {
		options: {
			livereload: true
		},
		fonts: {
			files: ['src/**/**/*.fonts'],
			tasks: ['fonts'],
			options: {
				interrupt: true
			}
		},
		js: {
			files: ['src/**/**/*.js'],
			tasks: ['js'],
			options: {
				interrupt: true
			}
		},
		scss: {
			files: ['src/**/**/*.scss'],
			tasks: ['sass', 'remfallback', 'autoprefixer'],
			options: {
				interrupt: true,
				livereload: false
			}
		},
		jade: {
			files: ['src/**/**/*.jade'],
			tasks: ['copy:jade'],
			options: {
				interrupt: true
			}
		},
		img: {
			files: ['src/img/**'],
			tasks: ['copy:img'],
			options: {
				interrupt: true
			},
		},
		video: {
			files: ['src/video/**'],
			tasks: ['copy:video'],
			options: {
				interrupt: true
			},
		},
		svgmin: {
			files: ['**/*.svg'],
			tasks: ['svgmin'],
			options: {
				interrupt: true
			},
		},
		imagemin: {
			files: ['**/*.{png,jpg,gif}'],
			tasks: ['svgmin'],
			options: {
				interrupt: true
			},
		}
	};

	// Pass above config to Grunt
	grunt.initConfig(gruntConfig);

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-remfallback');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');

	// Set up task aliases
	grunt.registerTask('js', env.jsTasks); // Get JS tasks from environment (e.g. only run concat or uglify in release)
	
	grunt.registerTask('sass', ['compass', 'remfallback']);

	// Define default task
	grunt.registerTask('default', ['jshint', 'copy:jade', 'js', 'imagemin', 'svgmin', 'copy:jade', 'copy:fonts', 'copy:video', 'compass', 'remfallback', 'autoprefixer', 'watch']);

};
