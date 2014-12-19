Unlike last year, the weeks leading up to Christmas were very quiet for me on the work front. From the 11th I had little of anything coming in from clients.

Disaster! It's Christmas, the most expensive time of the year. Fortunately I had already done most of my shopping, and had just the one Christmas party to go to ([Twitfaced](https://twitter.com/TwitFacedEvents), it's always been you).

This was, in fact, perfect timing. For the last few months I'd been working on a JavaScript port of the algorithm used by wildlife photo identification [I3S](http://reijns.com/i3s), which is used by researchers worldwide to identify whale sharks, manta rays, and basically any animal with pattern-based markings. I'd been chipping away at it in snatched free time and lunch breaks, and had got the basic elements of the algorithm working, but had come up against two obstacles:

* The algorithm has two parts - a quick initial comparison of patterns, followed by a more in-depth, "exhaustive" search which feeds the results of the first stage back into itself. I had the first stage working fine, but the second stage was producing some odd results, and I couldn't figure out why, nor get enough run up at the problem to begin tackling it.
* The performance was, of course, pretty terrible. The original algorithm is written in C++ and is incredibly quick. I wanted to keep the performance as good as possible, as in-field time is expensive and precious.

The two quiet weeks leading up to Christmas have given me the opportunity to experiement a bit and take a different approach to the problem. I've ditched my manual port and instead turned to Mozilla's [Emscripten](http://kripken.github.io/emscripten-site/) which transpiles native C/C++ code to Javascript. I came across Emscripten when considering a potential solution to the performance problem: ASM JavaScript. ASM is a subset of JavaScript that allows browsers who recognise it to assume static typing and ahead-of-time (as opposed to just-in-time) compilation. Emscripten, naturally, compiles to ASM JavaScript by default.

Long story short, I now have the algorithm [ported to JS](https://github.com/itsravenous/i3s-asm) and producing the same results as the original for known test matchings.

I'll be posting in the new year about my intentions for the port, as well as more about my experiences with Emscripten, but just now I wanted simply to share the message of the power of the luxury of a couple of weeks free from the demands of clients, money, and reality in general. I didn't lock myself away in a log cabin somewhere; I used the same office I do every day. It was just that freedom to experiment and work at a different pace that allowed me to quickly crack a nut I'd long been hammering away at.

Next year, I'm giving myself more weeks like that. And I think you should too. Merry Christmas, Happy New Year, and see all of you lovely people in 2015.