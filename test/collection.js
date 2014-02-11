(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'lowercase-backbone',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(backbone, should) {
	'use strict';

	describe('lowercase-backbone collection', function () {

		it('instantiation', function () {

			var people = backbone.collection([
				{ id: 0, name: 'Paul', age: 20 },
				{ id: 1, name: 'Andreas', age: 44 },
				{ id: 2, name: 'Ana', age: 17 }
			]);

			people.get(2).get('name').should.eql('Ana');
		});

		describe('basic functionalities', function () {


			beforeEach(function () {
				this.person = backbone.model.extend({
					initialize: function initializePerson(attr, options) {
						backbone.model.prototype.initialize.apply(this, arguments);

						// person initialization
						this.modelType = 'person';
					},

					introduceSelf: function () {
						return 'My name is ' + this.get('name');
					}
				});
			});

			it('accepts a custom model', function () {

				// singular
				var person = this.person;

				// plural
				var people = backbone.collection.extend({
					model: person,
				});

				// instance
				var friends = people([
					{ name: 'Joe', age: 23 },
					{ name: 'Joana', age: 21 },
					{ name: 'Rafael', age: 44 }
				]);

				var joe = friends.where({ name: 'Joe' })[0];

				joe.introduceSelf().should.eql('My name is Joe');
				joe.modelType = 'person';
			});
		});
	});
});
