var express = require('express');
var router = express.Router();
var fs = require('fs');
var md = require('node-markdown').Markdown;
var url = require('url');


// Get content
var projects = require('../content/projects.js');
var posts = require('../content/posts.js');

// Add content to projects
projects.map(function (p) {
  p.content = md(fs.readFileSync('content/'+p.file).toString());
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/_home/_home', {
    pretty: true,
  	projects: projects,
  	posts: posts,
  	page: {
  		title: 'Home',
      description: 'This is the portfolio of Tom Jenkins, freelance web developer based in Manchester. I bet he promised you coffee and cake. Good luck; he hasn\'t fed me in years.'
  	}
  });
});

/* GET about page. */
router.get('/about', function(req, res) {
  res.render('pages/_about/_about', {
    pretty: true,
  	projects: projects,
  	posts: posts,
  	page: {
  		title: 'About',
      description: 'Tom is an outdoorsy, animal-loving, tome-reading software engineer.'
  	}
  });
});

/* GET projects page. */
router.get('/projects', function(req, res) {
  res.render('pages/_projects/_projects', {
    pretty: true,
  	projects: projects,
  	posts: posts,
  	page: {
  		title: 'Projects',
      description: 'A showcase of web, mobile and utility wonders.'
  	}
  });
});

/* GET blog page. */
router.get('/blog', function(req, res) {
  res.render('pages/_blog/_blog', {
  	projects: projects,
  	posts: posts,
  	page: {
  		title: 'Blog',
      description: 'Musings and experiments in front-end and NodeJS.'
  	}
  });
});

/* GET individual blog post. */
router.get(/^\/blog\/(.+)$/, function(req, res) {
  var post = posts.filter(function (p) {
    return p.uri == req.params[0];
  });
  if (post.length) {
    post = post[0];
    // Get post content from file
    post.content = md(fs.readFileSync('content/'+post.file).toString());
  } else {
    res.writeHead(404);
    res.end('Post not found');
  }

  res.render('pages/_blog/_post', {
    pretty: true,
    projects: projects,
    post: post
  });
});

/* GET contact page. */
var contactSnippet = require('../contact');
router.get('/contact', contactSnippet);

module.exports = router;
