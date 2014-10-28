<ins datetime="2013-05-01">_Update 2013-05-01 - Last night I gave a talk based on this blog post at the fantastic [Manchester #FRED meetup](http://fredup.github.io/manchester/). You can see [the
writeup](http://simonowendesign.co.uk/blog/2013/05/01/manchester-fred-gets-responsive/) on Simon Owen's site, and you can also check out [the slides](http://slid.es/itsravenous/sass-for-modular-and-responsive) if you like._</ins>

If you've used SASS at all, you may be familiar with its wonderful `@extend` function. If not, here's a quick rundown. `@extend` takes a leaf from
object-orientated programming and allows you to make a CSS rule 'inherit' all the properties of another. Make sense? So you might write the following:

	.circle {
		width: 200px;
		height: 200px;
		border-radius: 100px 100px;
	}
	
	.sun {
		@extend .circle;
		
		background: yellow;
	}
	
Which SASS would compile into regular CSS as follows:

	.circle,
	.sun {
		width: 200px;
		height: 200px;
		border-radius: 100px 100px;
	}
	
	.sun {
		background: yellow;
	}
	
The advantage of using `@extend` here is that you can look at the ruleset
for .sun and instantly tell what it's supposed to achieve - it's a
circle, with a yellow background. This is what I mean by *presentational 
semantics* - the ability to write class names that represent exactly
what they achieve.


##Semantic classes in your markup, presentational classes in your SASS##
So how can we use this to write better HTML and CSS? With the rise of
CSS frameworks over the last few years, it's not unusual to see
presentational classes creeping into markup. You might, for instance,
be using Twitter's [Bootstrap](http://twitter.github.com/bootstrap/) to
get some nice button styles and a grid layout:

	<section class="main-content eight columns">
		
		<h1> Confirm purchase </h1>
		<button class="btn btn-primary">OK</button>
		<button class="btn btn-warning">Cancel</button>
		
	</section>
	
	<aside class="secondary-content two columns">
		...some secondary content
	</aside>
	
We all know these using classes like this is **bad**, but using a
framework is often quicker and easier than doing "the right thing",
especially when it comes to grids. So let's look at those grid classes
first. I was quite late to the CSS grid scene, but the first time I used
Bootstrap, it felt like I was back in 1999, coding with tables. So
what's the **right** way to do this?

In vanilla CSS, you might write:

	.primary,
	.secondary {
		float: left;
	}
	.primary {
		width: 80%;
	}
	.secondary {
		width: 20%;
	}
	
But when you need to apply grid sizes to a large number of different
elements, your CSS file could get messy and unreadable, fast. Instead,
with SASS:

	/* Base grid classes */
	.columns {
		float: left;
	}
	.columns-eight {
		width: 80%;
	}
	.columns-two {
		width: 20%;
	}
	
	/* Main layout */
	.primary {
		@extend .columns;
		@extend .columns-eight;
	}
	.secondary {
		@extend .columns;
		@extend .columns-eight;
	}

And, in fact, we can go one better - `@extend` supports chaining:

	/* Base grid classes */
	.columns {
		float: left;
	}
	.columns-eight,
	.columns-two {
		@extend .columns;
	}
	.columns-eight {
		width: 80%;
	}
	.columns-two {
		width: 20%;
	}
	
	/* Main layout */
	.primary {
		@extend .columns-eight;
	}
	.secondary {
		@extend .columns-two;
	}
	
So `.columns-eight` and `.columns-two` inherit the floating behaviour
from `.columns`, and `.primary` and `.secondary` inherit that floating
behaviour *and* their width from the `.columns-eight` and `.columns-two`
classes, respectively. 

But grids are pretty boring, and you'll probably want to use a library
like [SUSY](http://susy.oddbird.net/) to handle them, rather than
re-inventing a very complex wheel. Instead, why not gleefully write all
those presentational classes you've secretly wanted to write
(and perhaps have written!) over the years:

	.big-red-box {
		border-radius: 5px;
		border: 2px solid red
		background: #ffee00;
		font-size: 20px;
	}
	
	.drop-shadow {
		box-shadow: 0 0 5px #000;
	}
	
and simply assign them to the elements you like with `@extend`:

	.message {
		@extend .big-red-box;
		@extend .drop-shadow;
	}
	
meaning you avoid this:

	<div class="message big-red-box drop-shadow">
		SASS rocks!
	</div>
	
and can instead just write this:

	<div class="message">
		SASS rocks!
	</div>
	
Isn't that awesome?

One of my favourite uses of `@extend` is adding the 'clearfix' hack to elements - no more class="cf" all over my beautiful markup!

One of the most overlooked implications is the re-skinnability (totally a word) that this approach affords a project. If you've built an app or product
which you want to theme/style completely differently depending on who you're selling it to, you don't have to worry about presentational classes in the markup
getting in the way - you can potentially keep the exact same markup and just change your SASS, and by, a-ha, extension, your CSS. It also makes 'reskins'
of websites twelve months down the line a lot easier!

## Go forth and `@extend`! ##
Of course, as with all SASS, you could do this with regular CSS, but why would you? SASS means you can structure your CSS in an object-oriented way, which is
great if you're following an OOCSS pattern like Jonathan Snook's [SMACSS](http://smacss.com/). Go ahead and be free to write beautifully semantic markup
without any horrible presentation classes, but keep those *presentational semantics* visible in your SASS.