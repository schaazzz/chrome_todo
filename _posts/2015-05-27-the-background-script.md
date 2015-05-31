---
layout: post
title: Step 3 - The Background Script (background.js)
author: Shahzeb Ihsan
---

[Previous Step: Creating the Manifest (manifest.json)]({{ site.baseurl }}{% post_url 2015-05-27-creating-the-manifest %})

In the manifest.json we created in the [previous step]({{ site.baseurl }}{% post_url 2015-05-27-creating-the-manifest %}), we configured the following path for background.js:

{% highlight javascript %}
{
    //..........
    //..........
    "app": {
        "background": {
        "scripts": ["js/background.js"]
        }
    }
}
{% endhighlight %}

Create a folder "js" and create file [background.js](https://raw.githubusercontent.com/schaazzz/simple_tcp_client/sandbox/js/background.js) with the following content:

{% highlight javascript %}
/**
 * 'onLaunched' listener
 */
chrome.app.runtime.onLaunched.addListener(function() {
    // We'll add more functionality later, for now we'll just create
    // the window with dimensions 250x250
    chrome.app.window.create('window.html',
                             {'bounds': {'width': 250, 'height': 250}});

});
{% endhighlight %}

This "listener" will be called when the application is launched, for now, all we are doing in this listener is creating the HTML view. For more details on a Chrome app's lifecycle, checkout [this](https://developer.chrome.com/apps/app_lifecycle) Google page or the following lifecycle diagram for quick reference:

[Lifecycle Diagram from Google Chrome Developer portal![Lifecycle of a Chrome app](https://developer.chrome.com/static/images/applifecycle.png)](https://developer.chrome.com/apps/app_lifecycle)

Now that we have the basic application framework setup, let's create a basic HTML view with some straight forward JavaScript in the [next step](({{ site.baseurl }}{% post_url 2015-05-28-creating-a-simple-application %})) to create a simple application.

[Next Step: Creating a Simple Application]({{ site.baseurl }}{% post_url 2015-05-28-creating-a-simple-application %})
