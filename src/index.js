//     lowercase-backbone
//     (c) simonfan
//     lowercase-backbone is licensed under the MIT terms.

/**
 * All this module does is to modify the way backbone
 * objects are instantiated. Syntatic sugar.
 *
 * @module lowercase-backbone
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var subject = require('subject'),
		Backbone = require('backbone');

	var backbone = module.exports = function adapt(original) {

		// create a subject object with the original's prototype
		var builder = subject(original.prototype);

		// Overwrite the original initialize
		builder.proto('initialize', function () {

			// put the original intialize back
			this.initialize = original.prototype.initialize;

			// call original constructor
			// (it requires the original initialze to be at place)
			original.apply(this, arguments);
		});

		return builder;
	};

	backbone.model = backbone(Backbone.Model);
	backbone.collection = backbone(Backbone.Collection);
	backbone.view = backbone(Backbone.View);
	backbone.router = backbone(Backbone.Router);

	return backbone;
});
