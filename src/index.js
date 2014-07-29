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
	var _lmodel = backbone.model = subject(Backbone.Model.prototype);
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

	// Default options for `Collection#set`.
	var setOptions = {add: true, remove: true, merge: true};
	var addOptions = {add: true, remove: false};

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
		},

		// Prepare a hash of attributes (or other model) to be added to this
		// collection.
		_prepareModel: function(attrs, options) {

			//////////////////////////
			//////////////////////////
			/// MODIFICATIONS HERE ///
			//////////////////////////
			//////////////////////////
			/// original: if (attrs instanceof Model) {
			if (attrs instanceof _lmodel) return attrs;
			//////////////////////////
			//////////////////////////
			/// MODIFICATIONS HERE ///
			//////////////////////////
			//////////////////////////
			options = options ? _.clone(options) : {};
			options.collection = this;
			var model = new this.model(attrs, options);
			if (!model.validationError) return model;
			this.trigger('invalid', this, model.validationError, options);
			return false;
		},

		// Update a collection by `set`-ing a new list of models, adding new ones,
		// removing models that are no longer present, and merging models that
		// already exist in the collection, as necessary. Similar to **Model#set**,
		// the core operation for updating the data contained by the collection.
		set: function(models, options) {
			options = _.defaults({}, options, setOptions);
			if (options.parse) models = this.parse(models, options);
			var singular = !_.isArray(models);
			models = singular ? (models ? [models] : []) : _.clone(models);
			var i, l, id, model, attrs, existing, sort;
			var at = options.at;
			var targetModel = this.model;
			var sortable = this.comparator && (at == null) && options.sort !== false;
			var sortAttr = _.isString(this.comparator) ? this.comparator : null;
			var toAdd = [], toRemove = [], modelMap = {};
			var add = options.add, merge = options.merge, remove = options.remove;
			var order = !sortable && add && remove ? [] : false;

			// Turn bare objects into model references, and prevent invalid models
			// from being added.
			for (i = 0, l = models.length; i < l; i++) {
				attrs = models[i] || {};

				//////////////////////////
				//////////////////////////
				/// MODIFICATIONS HERE ///
				//////////////////////////
				//////////////////////////
				/// original: if (attrs instanceof Model) {
				if (attrs instanceof _lmodel) {
				//////////////////////////
				//////////////////////////
				/// MODIFICATIONS HERE ///
				//////////////////////////
				//////////////////////////
					id = model = attrs;
				} else {
					id = attrs[targetModel.prototype.idAttribute || 'id'];
				}

				// If a duplicate is found, prevent it from being added and
				// optionally merge it into the existing model.
				if (existing = this.get(id)) {
					if (remove) modelMap[existing.cid] = true;
					if (merge) {
						attrs = attrs === model ? model.attributes : attrs;
						if (options.parse) attrs = existing.parse(attrs, options);
						existing.set(attrs, options);
						if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
					}
					models[i] = existing;

				// If this is a new, valid model, push it to the `toAdd` list.
				} else if (add) {
					model = models[i] = this._prepareModel(attrs, options);
					if (!model) continue;
					toAdd.push(model);
					this._addReference(model, options);
				}

				// Do not add multiple models with the same `id`.
				model = existing || model;
				if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
				modelMap[model.id] = true;
			}

			// Remove nonexistent models if appropriate.
			if (remove) {
				for (i = 0, l = this.length; i < l; ++i) {
					if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
				}
				if (toRemove.length) this.remove(toRemove, options);
			}

			// See if sorting is needed, update `length` and splice in new models.
			if (toAdd.length || (order && order.length)) {
				if (sortable) sort = true;
				this.length += toAdd.length;
				if (at != null) {
					for (i = 0, l = toAdd.length; i < l; i++) {
						this.models.splice(at + i, 0, toAdd[i]);
					}
				} else {
					if (order) this.models.length = 0;
					var orderedModels = order || toAdd;
					for (i = 0, l = orderedModels.length; i < l; i++) {
						this.models.push(orderedModels[i]);
					}
				}
			}

			// Silently sort the collection if appropriate.
			if (sort) this.sort({silent: true});

			// Unless silenced, it's time to fire all appropriate add/sort events.
			if (!options.silent) {
				for (i = 0, l = toAdd.length; i < l; i++) {
					(model = toAdd[i]).trigger('add', model, this, options);
				}
				if (sort || (order && order.length)) this.trigger('sort', this, options);
			}

			// Return the added (or merged) model (or models).
			return singular ? models[0] : models;
		},

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
		initialize: function initialize(options) {
			this.initializeBackboneView(options);
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
