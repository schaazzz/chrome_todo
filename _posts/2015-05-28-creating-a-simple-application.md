---
layout: post
title: Step 4 - Creating a Simple Application
author: Shahzeb Ihsan
---

[Previous Step: The Background Script (background.js)]({{ site.baseurl }}{% post_url 2015-05-27-the-background-script %})

Let's create an HTML file, "window.html", which will contain a text field, a button and a text area.

"window.html" is loaded in [background.js]({{ site.baseurl }}{% post_url 2015-05-27-the-background-script %}) in the "onLaunched" listener in following statement:

{% highlight javascript %}
chrome.app.window.create('window.html',
                         {'bounds': {'width': 250, 'height': 250}});

{% endhighlight %}


{% highlight html %}

Now, let's create "window.html" with the following contents:

<html>
    <head>
        <meta charset="utf-8">
        <title>Sample Chrome App</title>
    </head>

    <body>
        <input id = "text" placeholder= "Type something here...">
        <button id = "enter">Enter</button>
        <textarea id = "output" rows ="13" cols ="25" readonly>Data log...</textarea>
    </body>
</html>
{% endhighlight %}

Now you can load this intermediate app by going to **chrome://extensions/** and using the "Load unpacked extension..." option. Your directory should look like this:

![Directory structure]({{ site.baseurl }}/images/directory_structure_1.jpg)

...or you can checkout the "sandbox" branch at the following commit (refer to this [post]({{ site.baseurl }}{% post_url 2015-05-25-git-reference %}) if you need a quick reference to Git commands for doing this):

<pre>
git checkout 0ee524052b0a58f7234d55f3c61875d0545bb3bf
</pre>

At this point, it will look like this... I know, I know, its not too pretty at this point but we'll style it later with some CSS but for now we'll just focus on the functionality.

![How your app looks like at this point...]({{ site.baseurl }}/images/sample_chrome_app.jpg)
