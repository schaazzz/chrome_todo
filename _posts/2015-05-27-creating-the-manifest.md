---
layout: post
title: Step 2 - Creating the Manifest (manifest.json)
author: Shahzeb Ihsan
---

[Previous Step: Getting Started]({{ site.baseurl }}{% post_url 2015-05-26-getting-started %})

Creating a manifest is simple enough:

{% highlight javascript %}
{
    "name": "Chrome ToDo",
    "description": "A simple to-do and note-taking Chrome app to accompany the tutorial at http://schaazzz.github.io/chrome_todo/",
    "version": "0.1",
    "app": {
        "background": {
        "scripts": ["js/background.js"]
        }
    }
}
{% endhighlight %}

You can download manifest.json [here](https://raw.githubusercontent.com/schaazzz/chrome_todo/sandbox/manifest.json).

[Next Step: The Background Script (background.js)]({{ site.baseurl }}{% post_url 2015-05-27-the-background-script %})
