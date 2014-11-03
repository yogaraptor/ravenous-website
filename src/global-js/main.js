/**
 * @file Sets up RequireJS config and bootstraps the website
 */

var commonJS = typeof module != 'undefined' && typeof requirejs == 'undefined';
var config = {
	
	'paths': {
		'jquery':			'vendor/jquery',
		'text':				'vendor/require-text',
		'html5shiv':		'ie/html5shiv',
	},
	
	'shim': {
		'jquery': {
			'exports': '$'
		},
		'html5shiv': {
			'exports' : 'h5s'
		},
		'vendor/highlight': {
			'exports': 'hljs'
		},
		'vendor/modernizr-custom': {
			'exports': 'Modernizr'
		}
	},
	
	'name': 'main',
	'wrap': true
	
};


// Loading via require or node?
if (!commonJS) {
	// Require, set up
	requirejs.config(config);

	requirejs([
		'vendor/console',
		'vendor/domReady',
		'jquery',
		'html5shiv',
		'componentList',
		'vendor/highlight',
		'vendor/modernizr-custom'
	],
		
	function (consolePolyfill, domReady, $, h5s, componentList, hljs, Modernizr) {
		$(function() {
			$('pre code').each(function(i, block) {
				hljs.highlightBlock(block);
			});
		});

		consolePolyfill.run();
		console.log('[main.js] Website init');

		// Run component tasks
		domReady(function () {
			// Get the list of components and 
			// run their tasks
			componentList.runComponentTasks();
		});

	});
} else {
	// Node, export config
	module.exports = config;
}