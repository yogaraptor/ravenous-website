If you haven't heard of the concept of “element queries”, then the simplest way I can put it is this:

> Element queries are like media queries, but for elements, not viewports.
> 

In other words, they allow you to write code like this:

    .some-widget {
        // Default, small layout here, lots of stacking stuff
        [...]
    }
    .some-widget[min-width="500px"] {
        // Bit more room now, medium layout with a bit of floating things next to each other
        [...]
    }
    .some-widget[min-width="800px"] {
        // Loads of room, wide layout with a sexy grid
        [...]
    }
    

And this is possible **cross-browser**, with the aid of a little JavaScript.

The same code using media queries would look relatively similar:

    .some-widget {
        // Default, small layout
        [...]
    }
    @media screen and (min-width: 500px) {
        .some-widget {
            // Medium layout
            [...]
        }
    }
    @media screen and (min-width: 800px) {
        .some-widget {
            // Wide layout
            [...]
        }
    }
    

The difference is that while the element queries target the `.some-widget` element, the media queries are just targeting the viewport, meaning that your widget's layout is likely to only work in cases where its element takes up the entire width of the viewport. If you want to have multiple instances of `.some-widget`, and one of those needs to sit in the body of a blog post, and the other in a sidebar element, then you're stuffed - you have to write and maintain two different variants of the layout tules for that widget. And that's before you consider the fact that a blog sidebar may be 25% of the width of the viewport on large screens, but full-width on a small screen when it gets dropped down beneath the blog post.

## Element queries for “works-anywhere” components

In short, element queries allow you to write layout rules for components that react to the size of the component's root element, rather than the viewport, meaning you can create components that are truly reusable and can be placed anywhere in a page's layout and "just work".

This decoupling of individual components from the viewport has allowed myself and [Phil Hauser](http://pjhauser.github.io/) to create a wonderful little workflow called the [Atomic Component System][3] which builds on Brad Frost's [fantastic concept of atomic design][4] and allows us to create truly reusable components and build an entire static site just be building self-contained components in isolation and then grouping them together into templates and pages. The documenting of this is a work in progress, but it's usable now, and I'd encourage you to go and try it.

## Getting over the yuk-factor of using JavaScript for layout

There are often times when browser implementations of CSS fall short of what we would like, forcing us to resort to JavaScript polyfills or other workarounds. Think [rems][5], [:nth-child][6], or just [getting those three damn boxes with variable content next to each other to be the same height][7].

The latter two are examples of where we might be relying - even if only in one browser - on JavaScript for layout. This has always made me feel incredibly uneasy; using JS for progressive enhancement (say, rounded corners in an ancient browser, which I do not recommend trying) is great, but actually relying on JS to ensure a layout displays correctly feels very fragile to me. Should anything goes wrong before the layout code kicks in, your page could end up resembling a jigsaw puzzle that hasn't quite been finished. There's also the issue of performance - if your layout JS doesn't run right away, users may see a FOUC (Flash Of Unstyled Content), though here we should probably replace "unstyled" with "un-laid-out". Yeah, catchy.

So why would I advocate using a concept that hasn't yet been specced, let alone implemented in browsers? Three reasons:

1. Element queries are so incredibly useful, and solve so many problems of front end development, that the benefits vastly - in my opinion - outweigh the potential downsides.

2. It's very easy to implement a mobile-first layout with element queries, meaning that if the JS doesn't get run for any reason, you'll still have a fully working layout, even if it is designed for the smallest form factor.

3. The sooner we start using then in production, the sooner a dialogue about how they might be specced for native CSS can begin. The wild web is often where we learn most about the usefulness of a technique, as well as being a springboard for uses we might not overlooked in our original understanding of it.

## In conclusion

I'm not saying you should use element queries on your next critical project. But if you're redesigning your portfolio site, or have a small, simple client site to do, maybe take the opportunity to give them a go and rethink your approach to modular builds. As I've stressed above, element queries will only really be useful to you if you're building components, rather than whole pages at once. I'm using them on a couple of production sites that will be going live very soon, and so far am very happy with how it's going. Below is a list of prolyfills to get you going. I'm using Tyson Matanich's at the moment, the only caveat of which is that it bugs out if you use ::before or ::after inside element queries. I'm working on fixing that and submitting a pull request.

* [https://github.com/tysonmatanich/elementQuery][8]
* [https://github.com/marcj/css-element-queries][9]

## Further reading

This article being a bit of a love letter, you might want a more in-depth discussion of element queries - how they work, the potential pitfalls, etc. These people can help you with that:

* Tab Atkins - [The State of Element Queries][10]
* Ian Taylor - [Media Queries are a Hack][11]
* Jonathan T. Neal - [Thoughts on Media Queries for Elements][12]
* **UPDATE:** Dan Donald has collected together a bunch more for you on his [Kippt page][13]



[0]: http://itsravenous.com/index.php/blog/tag/fred
[1]: http://itsravenous.com/index.php/blog/tag/workflow
[2]: http://itsravenous.com/index.php/blog/tag/components
[3]: https://github.com/pjhauser/atomic-component-system
[4]: http://bradfrostweb.com/blog/post/atomic-web-design/
[5]: https://www.npmjs.org/package/grunt-remfallback
[6]: http://selectivizr.com/
[7]: http://css-tricks.com/equal-height-blocks-in-rows/
[8]: https://github.com/tysonmatanich/elementQuery
[9]: https://github.com/marcj/css-element-queries
[10]: http://www.xanthir.com/b4VG0
[11]: http://ianstormtaylor.com/media-queries-are-a-hack/
[12]: http://www.jonathantneal.com/blog/thoughts-on-media-queries-for-elements/
[13]: https://kippt.com/hereinthehive/element-query-resources