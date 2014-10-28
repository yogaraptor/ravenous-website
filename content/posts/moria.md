You may have heard a lot about the new [Web Speech API](http://www.w3.org/community/speech-api/), currently only [implemented in Chrome](http://www.google.com/intl/en/chrome/demos/speech.html). There's a good walkthrough of Chrome's implementation and the API in general on the ever-useful [HTML5 Rocks](http://updates.html5rocks.com/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API). It's likely to be most useful as a voice controller for HTML5 apps, but I can see it adding a dimension to games too, and wanted to play about with it a little and create something fun. Take a look at the demo below (which also include HTML5 audio and CSS 3D transforms and animations). If you know your Tolkien it'll be a cinch, but in case your Elvish is a little rusty, I'm sure you can find a translator online somewhere...

<a href="http://aviary.itsravenous.com/moria" class="button">Enter the Mines of Moria</a>

I've tried to make the source code as readable as possible, though it was written very quickly - checkout [the code](https://github.com/itsravenous/demos/tree/master/moria) on Github, and feel free to fork. The various audio and image assets used are &copy; NewLine Cinema and are included purely for demonstration purposes.

## Mutually Assured Delight ##
A bit of background - this game was part of a treasure hunt put together by [my brother](http://github.com/sourcejedi) and I, which
I would love to package up and put online at some point. My brother and I go perhaps three times a year to visit our aunt,
uncle and cousins in Bristol, and for as long as I can remember, we've subjected each other to treasure hunts: series of (usually cryptic, rhyming,
or both) clues culminating in a prize hidden somewhere in the house. Last Christmas, it was our cousins' turn to
put on the hunt. They were older now, and wilier. And a little sadistic. One of the clues was in the middle of a
ten-inch block of ice. So when we decided we would go down and visit at Easter, my brother and I felt we needed to
up our game somewhat. Knowing that two of the three cousins had received an iPod touch each for Christmas, we decided
to put on a HTML5 treasure hunt. Instead of lyrical clues stashed around the house, we hid QR codes. Each code took the
<del>victim</del> <ins>cousin</ins> either to a picture clue for the location of the next code, or a mini-game hosted on
my laptop (hidden upstairs). We had a gyro-based game where they had to tilt unstable isotopes into cooling chambers,
a jamming signal setup, and more. The treasure hunt culminated in a nuclear-sub-style-press-both-buttons-at-once task which
'launched' a rocket in one of the upstairs rooms (countdown & blastoff noise with speakers set to max) which revealed the
location of the 'treasure' (various chocolatey goods).