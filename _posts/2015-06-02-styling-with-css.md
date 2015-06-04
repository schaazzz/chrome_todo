---
layout: post
title: Step 6 - Styling with CSS
author: Shahzeb Ihsan
step: 6
---

[Previous Step: Adding JavaScript Functionality]({{ site.baseurl }}{% post_url 2015-06-02-adding-some-js-functionality %})

Since a Chrome app's UI is basically just plain HTML, we can use the awesomeness of [JSFiddle](https://jsfiddle.net) to create and test our CSS.

I've already initialized a fiddle with the contents of "window.html" (slightly modified), you can [use that fiddle](https://jsfiddle.net/schaazzz/xryaw01g/5/) or you can create a new fiddle with the following contents i.e. the reference to "application.js" and the head/html tags and their contents have been removed:

{% highlight html %}
<body>
    <input id="text" placeholder="Type something here...">
    <button id="enter">Enter</button>
    <textarea
        id="output" rows="13" cols="25" readonly>Data log...
    </textarea>
</body>
{% endhighlight %}

Before we start, I should confess that I kinda-sorta suck at CSS and will probably never ever be comfortable with it since I'm not a UI designer and there are lots of fantastic CSS UI kits available on the [internet](http://lmgtfy.com/?q=free+css+ui+kit). But that shouldn't stop us from experimenting with some basic UI design :wink:. Now that that's out in the open, let's get cracking with some CSS.
