require.config({
	urlArgs: 'bust=0.5520708789117634',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'lowercase-backbone': 'index',
		backbone: '../bower_components/backbone/backbone',
		jquery: '../bower_components/jquery/jquery',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'requirejs-text': '../bower_components/requirejs-text/text',
		qunit: '../bower_components/qunit/qunit/qunit',
		subject: '../bower_components/subject/built/subject',
		underscore: '../bower_components/underscore/underscore'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
