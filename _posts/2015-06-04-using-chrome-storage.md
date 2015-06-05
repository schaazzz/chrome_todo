---
layout: post
title: Step 7 - Using Chrome's Storage API
author: Shahzeb Ihsan
step: 7
---

[Previous Step: Styling with CSS]({{ site.baseurl }}{% post_url 2015-06-02-styling-with-css %})

First things first, lets get the permissions out of the way, add the following line to **background.js**:

{% highlight javascript %}
"permissions" : ["storage"]
{% endhighlight %}


[chrome.storage](https://developer.chrome.com/extensions/storage) is relatively simple, with only calls to "set" and "get" required for writing and reading, respectively. Since **chrome.storage** is asynchronous, a callback function has to be provided during "set" and "get" calls for notification of when the storage operation is complete.

In **application.js**, we add code to save data currently displayed in the textarea, the modified **application.js** script:

{% highlight javascript %}
onload = function() {
    document.getElementById('enter').onclick = function() {
        var txt = document.getElementById('output').value + '\r\n';
        txt += document.getElementById('text').value;
        document.getElementById('output').value = txt;

        chrome.storage.sync.set({'todos': txt},
            function() {
                console.log('todos saved...');
            }
        );
    };
};
{% endhighlight %}

Let's relaunch the application and check if this works. Once open:
- right click anywhere on the app and click "Inspect element" and in the "Developer Tools" window go to the "Console" tab
- enter something in the input and click enter
- in the "Developer Tools" window, go to the "Storage Explorer" tab and select "chrome.storage.sync" and check the contents

<p><a href = "javascript:void(0);" onclick="popup()" id="test">If the gif is too small, right click and open in new tab<img src="/chrome_todo/images/set_animation.gif" alt="Saving data using chrome.storage.sync.set"></a></p>

Loading the data at startup and repopulating the text area is slightly trickier. First we read back the data in **background.js** as follows:

{% highlight javascript %}
chrome.app.runtime.onLaunched.addListener(function() {

    // Read data from storage
    chrome.storage.sync.get('todos',
        function(obj){
            console.log(obj);
        }
    );

    // Create the HTML view
    chrome.app.window.create('window.html',
                             {'bounds': {'width': 505, 'height': 565}});

});
{% endhighlight %}

Reload the app, right click anywhere and click "Inspect background page" and go to the "Console" tab, you should see this:

![Loading data on launch]({{ site.baseurl }}/images/chrome_todo_5.jpg)
