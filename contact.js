/**
 * @file Provoides middleware to process the contact form
 * @author Tom Jenkins tom@itsravenous.com
 */

var config = require('./config');
var url = require('url');
var nodemailer = require('nodemailer');
var emailValidator = require('email-validator');

module.exports = function(req, res, next) {

	var renderOptions = {
		sent: false,
	 	pretty: true
	};

	// Parse URL for query string
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	// Check form has been submitted
	if (query.submit) {
		renderOptions.submission = {
			name: query.name,
			email: query.email,
			phone: query.phone,
			subject: query.subject,
			message: query.message
		}
		if (!query.name || !query.email || !query.message) {
			// Missing required fields
			renderOptions.missingFields = true;
			res.render('pages/_contact/_contact', renderOptions);
		} else if (!emailValidator.validate(query.email)) {
			// Invalid email address
			renderOptions.invalidEmail = true;
			res.render('pages/_contact/_contact', renderOptions);
		} else {
			// Valid submission, proceed

			// Create mail transport
			var transporter = nodemailer.createTransport(config.mailOptions);

			// Set up message
			var msg = "Name: "+query.name+"\nPhone: "+query.phone+"\nEmail:"+query.email+"\nMessage: "+query.message;
			var mailOptions = {
				from: query.email,
				replyTo: query.email,
				to: config.myemail,
				subject: '[CAW!] ' + query.subject,
				text: msg,
			};

			// Send mail
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
					res.writeHead(500);
					res.end('Something went wrong sending your message. Please go back and try again, or email me directly at .' + config.myemail);
				} else {
					console.log('Message sent: ' + info.response);
					renderOptions.sent = true;
					res.render('pages/_contact/_contact', renderOptions);
				}
			});
		}
	} else {
		renderOptions.submission = {};
		res.render('pages/_contact/_contact', renderOptions);
	}
}