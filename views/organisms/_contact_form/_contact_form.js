/**
 * @file Defines behaviours for a Contact form module
 * @author Tom Jenkins tom@itsravenous.com
 */

define([
	'jquery',
	'componentTasks'
], function ($, componentTasks) {

	/**
	 * Contact form view
	 */
	var ContactForm = function (el) {
		console.log('new form', el);
		this.$el = $(el);
		this.el = this.$el.get(0);

		this.$fields = this.$el.find('input, textarea');

		this.addBindings();
	};

	ContactForm.prototype = {

		addBindings: function () {
			var self = this;

			// Activate input on focus
			this.$fields.on('focus', function (e) {
				var $field = $(this);
				self.activate($field);
			});

			// Deactivate Field on focus
			this.$fields.on('blur', function (e) {
				var $field = $(this);
				self.deactivate($field);
			});
		},

		activate: function ($field) {
			this.getFieldWrapper($field).addClass('is-active');
		},

		deactivate: function ($field) {
			var $wrapper = this.getFieldWrapper($field);
			$wrapper.removeClass('is-active');
			if ($field.val().length) {
				$wrapper.addClass('is-filled');
				console.log('filled');
			} else {
				$wrapper.removeClass('is-filled');
			}
		},

		getFieldWrapper: function ($field) {
			return $field.parent();
		}

	};

	componentTasks.registerTask({
		selector: '.form-contact',
		task: function($el) {
			new ContactForm($el);
		}
	});
	
	return {};

});
