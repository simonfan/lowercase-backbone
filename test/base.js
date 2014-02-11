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

	describe('lowercase-backbone basics', function () {
		beforeEach(function (done) {
			done();
		});

		it('Backbone.Model', function () {

			var model = backbone(Backbone.Model),
				fruit = model({
					name: 'Banana',
					color: 'yellow'
				});

			fruit.get('name').should.eql('Banana');


			var control = false;

			fruit.on('change:name', function () {
				control = true;
			});

			fruit.set('name', 'Apple')

			control.should.be.ok;


			var redFruit = model.extend({
				initialize: function (attr, options) {

					model.prototype.initialize.apply(this, arguments)
					'alslsal';
				},
			});


			var apple = redFruit({
				name: 'Apple',
				color: 'red'
			});


			apple.get('name').should.eql('Apple')

		});
	});
});
