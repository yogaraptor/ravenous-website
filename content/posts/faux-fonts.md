It has [been][0] [well][1] [documented][2] that when using CSS3 fonts, you should define font-style and font-weight in the @font-face declaration, instead of doing what popular (and otherwise awesome) font services like [Font Squirrel][3] do - declaring a different font name for each style. So instead of:

    /* Gentium Regular declaration */
    @font-face {
        font-family: 'GentiumRegular';
        src: url('gentium-webfont.ttf');
        font-weight: normal;
        font-style: normal;
    }
    
    /* Gentium Italic declaration */
    @font-face {
        font-family: 'GentiumItalic';
        src: url('gentium_italic-webfont.ttf');
        font-weight: normal;
        font-style: normal;
    }

you have:

    /* Gentium Regular declaration */
    @font-face {
        font-family: 'Gentium';
        src: url('gentium-webfont.ttf');
        font-weight: normal;
        font-style: normal;
    }
    
    /* Gentium Italic declaration */
    @font-face {
        font-family: 'Gentium';
        src: url('gentium_italic-webfont.ttf');
        font-weight: normal;
        font-style: italic;
    }

This means that browsers don't add faux-italic/bold to your already italicised/bolded text, and that you can actually use font-style and font-weight in your CSS rules, rather than having to use a different font name just to get italic/bold text. The end result is simpler CSS and prettier text. So what's the catch?

## So, Internet Explorer, we meet again

That's right. IE 8 and below don't support font-style and font-weight in the @font-face declaration. This means you end up with faux-italic and faux-bold text. For most typefaces, the faux-bold isn't so bad (though it's nowhere near as good as actual bold), but it's usually the faux-italic that really shows. Here's some text in [Gentium Basic][4], rendered by IE 9 in true italic:

![Text sample in true italic](http://itsravenous.com/a/uploads/blog/true.png)

and here's the same text, rendered by IE 8, in faux-italic.

![Text sample in faux-italic](http://itsravenous.com/a/uploads/blog/faux.png)

Yuk, yes? So what can you do about it? The bad news is, there isn't a one-line fix. The good news is, that, as with many IE problems, we can solve it with conditional comments. So you remember those @font-face declarations which you stripped out of your Font Squirrel font-face kit -- one for each font-style? Put 'em back in. That's the quick part. The slightly longer part is rounding up all your CSS rules that specify an italic or bold font, and sticking them in your IE-only stylesheet like so:

    /* Italic text */
    em, .intro, #nav .caption, cite, .source {
        font-family: 'GentiumItalic';
        font-style: normal;
    }
    
    /* Bold text */
    strong, h1, h2, h3, h4, h5, h6, .title {
        font-family: 'GentiumBold';
        font-weight: normal;
    }
    
    /* Bold-italic text */
    em strong, strong em, strong cite, cite strong {
        font-family: 'GentiumBoldItalic';
        font-style: normal;
        font-weight: normal;
    }
    

Hopefully your list of selectors isn't too long -- and if you've been writing good CSS it shouldn't be!

The only downside to this method is that, as with Font Squirrel's @font-face kits, if the font fails to load for any reason, no text will be shown in either bold or italic -- everything will be plain ol' regular.

## A good idea?

I just came up with this today after seeing the horrible things IE did to my serif font when faux-italicising it -- most of my recent projects that used CSS3 fonts were using sans-serif, which tend to suffer less. If you see any problems with the workaround, or any suggestions for improvement, feel free to [drop me a tweet][5].

_Note: I realise I haven't implemented the above on this, my own site - for the reason that there simply isn't much italic text on it! I'm pretty sure the only italic is these little notices at the bottom of blog posts. When it starts to bug me, I'll add the fix, but time is cupcakes..._.


[0]: http://www.456bereastreet.com/archive/201012/font-face_tip_define_font-weight_and_font-style_to_keep_your_css_simple/
[1]: http://spaceninja.com/2010/11/font-face-faux-styles/
[2]: http://www.metaltoad.com/blog/how-use-font-face-avoid-faux-italic-and-bold-browser-styles
[3]: http://www.fontsquirrel.com/
[4]: http://www.fontsquirrel.com/fonts/Gentium-Basic
[5]: http://www.twitter.com/itsravenous