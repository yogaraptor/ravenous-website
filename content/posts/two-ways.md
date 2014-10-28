Often, if we don't think about it too much, the website we develop on our local machine can easily end up being the exact same one we put live -- that is, we don't change anything before pressing 'Upload'. This isn't particularly bad, it's just a bit sloppy. In this post, I'll put forward some food for thought on steps to take before pushing your site (or app) up onto the web.

## 1) Minify your JS and CSS

It might sound like a pain, but remember, you're only doing this when you push live, i.e. not very often. It's worth the extra two minutes for what I've found is generally a 40-70% reduction in file size. Not bad, especially when writing a large, complex web app. Why wouldn't you halve the load time for your CSS and JS if you could?

So how do you do it? You can either use an online minifier, like [JSMin][0] (which uses Javascript itself, so you can easily save the page to your local machine) or, if you're on Linux or Mac, download a command-line app like [this offering][1] from Ben Pickles (requires Ruby, which you're already using for [Compass][2], right?) The advantage of a command-line app is the ability to automate the process -- I have a script called build.sh that sits in my project root and is run before pushing live, sorting everything out at once. 

## 2) Reduce the number of HTTP requests

Large request numbers are the main cause of sluggish sites. It's quite easy to rack them up, too. Most sites use jQuery or something similar; add a few plugins and some homemade stuff and you can easily be approaching twenty requests. View the source of this site, and you'll see there's just one css file and one js file (combo.css and combo.js), CDN jQuery and conditional IE stylesheets aside.

Luckily, it's almost as easy to get the number down. I use [Javascript Pre-Processor][3] (JSPP) to concatenate (smush together into one file) my code so I end up with just one CSS file and one JS file. The script above from Ben Pickles also has a similar capability. Again, my build.sh script automates this for me, saving more time my end too! If you're using [Drupal][4], it already has an option for this in the admin area, under performance. There is a [plugin for Wordpress][5] which does the same, though I haven't tested it yet.

You can reduce more requests by using CSS background sprites instead of multiple images as much as possible, though if you're too aggressive you can end up making things difficult for yourself. Here's an excellent article on the topic. The short version is it's great to use sprites, but limit each one to a maximum number of images. Certainly don't create one giant sprite for every background image on your site.

There are other interesting ways to reduce requests -- one such technique is employed on this very site -- using css3 fonts for scalable icons and decals. I've created my own custom SVG font using the wonderful [Inkscape][6] which I use for most of my design work already. Now the curly leaf decorations, social media icons and other fun stuff are a) all scalable and b) all in one file.

## The benefits

Obviously, less bandwidth and faster page loads are both worthy goals, but with increasing on-the-go traffic meaning that people are often viewing your site over a 3G (or if they're lucky, 4G) connection, making your site load time as low as possible is more important than ever.

It's not just mobile connections that can be sluggish, though -- I've often been at a coworking event or using wifi in a coffee shop and found that the venue's connection is lagging under the sheer number of people using it. I recently couldn't update an online database because the upload (a mere 200k) took too long and the system timed out -- obviously a different kettle of fish but illustrative of the general point -- there are some infuriatingly slow and unreliable connections out there, and, for the forseeable future, a significant, and shifting, segment of your audience are going to be using them. Let your site be the one that loads faster than the rest -- after all, if they can visit your site but your competitor's is timing out, guess who gets the sale? Happy squashing!


[0]: http://fmarcia.info/jsmin/test.html
[1]: https://gist.github.com/765432
[2]: http://compass-style.org/
[3]: http://js-preprocessor.com/
[4]: http://www.drupal.org/
[5]: http://wordpress.org/extend/plugins/autoptimize/
[6]: http://www.inkscape.org/