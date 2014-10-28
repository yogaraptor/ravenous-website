/**
 * @file Main nav behaviours
 * @author Tom Jenkins tom@itsravenous.com
 */

define([
	'jquery',
	'componentTasks'
], function ($, componentTasks) {

	var MainNav = function (el) {
		this.$el = $(el);
		this.el = this.$el.get(0);

		this.$links = this.$el.find('a');

		this.setActive();
	};

	MainNav.prototype = {

		setActive: function () {
			var currentURL = window.location.toString();
			this.$links.each(function (i, link) {
				var sectionURL = currentURL;
				if (currentURL.indexOf('blog') != -1) {
					sectionURL = currentURL.split('/').slice(0, -1);
					console.log(sectionURL);
				}
				if (sectionURL == link.href) {
					link.parentNode.classList.add('is-current');
				}
			});
		}

	};

	componentTasks.registerTask({
		selector: '.main-nav',
		task: function($el) {
			new MainNav($el);
		}
	});
	
	return {};

});
