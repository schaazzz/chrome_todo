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

The following CSS has been added to this [fiddle](https://jsfiddle.net/schaazzz/xryaw01g/6/), play around with the CSS properties to modify how your elements look:

{%highlight css %}
html,
body {
    margin: 0;
    padding: 0;
 }

body {
   font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
   line-height: 1.4em;
   background: #F3F3F3;
   color: #4D4D4D;
   width: 550px;
   margin: 0 auto;
   border: 0;
   font-smoothing: antialiased;
}

h6 {
  position: relative;
  width: 100%;
  font: 20px Impact, Charcoal, sans-serif;
  font-size: 20px;
  padding: 1px;
  margin: 20px 5px 1px 5px;
  color: #b3b3b3;
  color: rgba(50, 50, 50, 0.8);
  text-shadow: -1px -1px rgba(0, 0, 0, 0.2);
}

button {
   position: relative;
   font-size: 15px;
   font-family: inherit;
   line-height: 1em;
   padding: 5px;
}

input {
   position: relative;
   width: 80%;
   font-size: 15px;
   font-family: inherit;
   line-height: 1em;
   outline: none;
   color: rgba(0, 0, 0, 1.0);
   padding: 6px;
   margin: 5px 0px 5px 5px;
   border: 1px solid #999;
   box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
   box-sizing: border-box;
}

textarea {
   position: relative;
   width: 90%;
   font-size: 15px;
   font-family: inherit;
   line-height: 1em;
   outline: none;
   color: rgba(0, 0, 0, 1.0);
   padding: 6px;
   margin: 5px 5px 5px 5px;
   margin-bottom: 0px;
   border: 1px solid #999;
   box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
   box-sizing: border-box;
}

{% endhighlight %}

Let's add this CSS to a <em>cleaned-up</em> "window.html" using the "link" tag to the "head":

{% highlight html %}
<html>
   <head>
       <meta charset="utf-8">
       <title>Chrome ToDo</title>
       <link rel="stylesheet" href="css/style.css">
   </head>

   <body>
        <!--- Code removed --->
        <h6>#&nbsptodos...</h6>
        <textarea id="output" rows="30" cols="25" readonly></textarea>
        <!--- Code removed --->
   </body>
</html>
{% endhighlight %}

Now create a folder called "css" in your project folder and copy [style.css](https://raw.githubusercontent.com/schaazzz/chrome_todo/sandbox/css/style.css). Reload the app in Chrome and you'll see a bit of a mess because the elements don't fit into the HTML view anymore. So, lets modify "background.js" to adjust the dimensions of the window:

{% highlight javascript %}
chrome.app.runtime.onLaunched.addListener(function() {
    // We'll add more functionality later, for now we'll just create
    // a window with the required dimensions...
    chrome.app.window.create('window.html',
                             {'bounds': {'width': 505, 'height': 565}});

});
{% endhighlight %}

Reload the app now and all should be well.

![After we are done with CSS styling]({{ site.baseurl }}/images/chrome_todo_4.jpg)

In the last part of this tutorial, we'll take a look at how to use the [chrome.storage](https://developer.chrome.com/extensions/storage) for saving and retrieving your app's data.

You can checkout the "sandbox" branch upto this point at the following commit (refer to this [post]({{ site.baseurl }}{% post_url 2015-05-25-git-reference %}) if you need a quick reference to Git commands for doing this):

<pre>
git checkout 8151ddec16549737f9bcc29bb5f3919be8b8ca01
</pre>

[Next Step: Using Chrome's Storage API]({{ site.baseurl }}{% post_url 2015-06-04-using-chrome-storage %})
