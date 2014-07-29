(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'lowercase-backbone',
		// dependencies for the test
		deps = [mod, 'should', 'backbone'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(backbone, should, Backbone) {
	'use strict';

	describe('lowercase-backbone model', function () {

		it('instanceof', function () {

			var model = backbone.model,
				fruit = model({
					name: 'Banana',
					color: 'yellow',
				});

//			backbone.model.isPrototypeOf()

			fruit.should.be.instanceof(backbone.model);

//			console.log(Backbone.Model);

			var collection = backbone.collection();

		//	console.log(fruit.get('name'));

			collection.add(fruit);

		//	console.log(collection.first().attributes);
			collection.first().get('name').should.eql('Banana');
		});

		it('instantiation', function () {

			var model = backbone.model,
				fruit = model({
					name: 'Banana',
					color: 'yellow'
				});

	//		console.log(backbone.model);

			fruit.get('name').should.eql('Banana');

		});

		describe('basic functionalities', function () {

			beforeEach(function () {
				this.fruit = backbone.model({
					name: 'Banana',
					color: 'yellow',
				});
			});

			it('events', function () {

				var fruit = this.fruit,
					control = false;

				fruit.on('change:name', function () {
					control = true;
				});

				fruit.set('name', 'Apple')

				control.should.be.ok;

			});

		});

		describe('extendability', function () {


			it('one step', function () {

				var model = backbone.model;



				var person = model.extend({

					initialize: function initializePerson() {
						model.prototype.initialize.apply(this, arguments);
					},

					type: 'person',

					defaults: {
						name: 'Someone',
						age: 'unknown'
					},

					introduceSelf: function () {
						return 'My name is ' + this.get('name');
					},
				});



				var simon = person({
					name: 'Simon'
				});

				simon.introduceSelf().should.eql('My name is Simon');
				simon.get('age').should.eql('unknown');

			});

			it('two steps', function () {
				var person = backbone.model.extend({
					initialize: function (attr, options) {
						backbone.model.prototype.initialize.apply(this, arguments);

						options = options || {};

						// person initialization here.
						this.personality = options.personality;
					},

					defaults: {
						name: 'Someone',
						age: 'unknown',
					},

					introduceSelf: function () {
						return 'I am ' + this.get('name');
					}
				});


				var craftsman = person.extend({
					initialize: function (attr, options) {
						person.prototype.initialize.apply(this, arguments);

						// craftsman initialization here
						this.craft = options.craft;
					},

					tellCraft: function () {
						return 'I do ' + this.craft;
					}
				});


				// person instance
				var joao = person({
					name: 'Joao'
				}, {
					personality: 'gentleman'
				});

				joao.should.not.have.property('tellCraft');
				joao.personality.should.eql('gentleman');

				// craftsman instance
				var maria = craftsman({
					name: 'Maria',
					age: 34,
				}, {
					personality: 'calm',
					craft: 'ceramics'
				});

				maria.personality.should.eql('calm');
				maria.craft.should.eql('ceramics');
				maria.introduceSelf().should.eql('I am Maria')
			})


		});

	});
});
