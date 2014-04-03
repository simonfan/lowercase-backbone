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
		Backbone = require('backbone'),
		_ = require('lodash');

	var backbone = module.exports = {};

	/**
	 * backbone.model
	 */

	// proto properties
	backbone.model = subject(Backbone.Model.prototype);
	// define initialization logic
	backbone.model.proto({
		initialize: function initialize() {
			this.initializeBackboneModel.apply(this, arguments);
		},

		initializeBackboneModel: function lowercaseBackboneModel(attributes, options) {

			/* jshint ignore:start */
			var attrs = attributes || {};
			options || (options = {});
			this.cid = _.uniqueId('c');
			this.attributes = {};
			if (options.collection) this.collection = options.collection;
			if (options.parse) attrs = this.parse(attrs, options) || {};
			attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
			this.set(attrs, options);
			this.changed = {};
		//	this.initialize.apply(this, arguments);
			/* jshint ignore:end */
		}
	});

	// proto properties
	backbone.collection = subject(Backbone.Collection.prototype);
	// initialization
	backbone.collection.proto({
		initialize: function initialize() {
			this.initializeBackboneCollection.apply(this, arguments);
		},

		initializeBackboneCollection: function lowercaseBackboneCollection(models, options) {

			/* jshint ignore:start */
			options || (options = {});
			if (options.model) this.model = options.model;
			if (options.comparator !== void 0) this.comparator = options.comparator;
			this._reset();
		//	onlu line removed:
		//	this.initialize.apply(this, arguments);
			if (models) this.reset(models, _.extend({silent: true}, options));
			/* jshint ignore:end */
		}
	});

	/**
	 * backbone.view
	 */

	// List of view options to be merged as properties.
	var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

	// proto properties
	backbone.view = subject(Backbone.View.prototype);
	// initialization
	backbone.view.proto({
		initialize: function initialize() {
			this.initializeBackboneView.apply(this, arguments);
		},

		initializeBackboneView: function lowercaseBackboneView(options) {

			/* jshint ignore:start */
			this.cid = _.uniqueId('view');
			options || (options = {});
			_.extend(this, _.pick(options, viewOptions));
			this._ensureElement();
		//	this.initialize.apply(this, arguments);
			this.delegateEvents();
			/* jshint ignore:end */
		}
	});

	/**
	 * backbone.router
	 */

	// prototype properties
	backbone.router = subject(Backbone.Router.prototype);
	// initialization
	backbone.router.proto({
		initialize: function initialize() {
			this.initializeBackboneRouter.apply(this, arguments);
		},

		initializeBackboneRouter: function lowercaseBackboneRouter(options) {

			/* jshint ignore:start */
			options || (options = {});
			if (options.routes) this.routes = options.routes;
			this._bindRoutes();
		//	this.initialize.apply(this, arguments);
			/* jshint ignore:end */
		},
	});

	backbone.history = Backbone.history;
});
