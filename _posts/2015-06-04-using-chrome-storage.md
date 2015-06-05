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

In **application.js**, we add code to save data currently displayed in the textarea using a key/value pair, the key is "todos" and the value is what is currently displayed in the textarea. The modified **application.js** script:

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

<p><a href = javascript:void(0); onclick=popup("{{ site.baseurl }}/images/set_animation.gif");>Click image to open larger version<img src="/chrome_todo/images/set_animation.gif" alt="Saving data using chrome.storage.sync.set"></a></p>

Loading the data at startup and repopulating the text area is slightly more complex. We want to load stored data as early as possible so we can initialize the textarea with these values. The tricky part is copying the data from the background page to the window. First, lets get the straight forward part out of the way, we'll read back the data in **background.js** as follows:

{% highlight javascript %}
var stored_todos;

chrome.app.runtime.onLaunched.addListener(function() {
    // Read data from storage
    chrome.storage.sync.get('todos', function(obj){
        console.log(obj);
        if (obj.todos === undefined) {
            stored_todos = undefined;
        } else {
            stored_todos = obj.todos;
        }
    });

    // Create the HTML view
    chrome.app.window.create('window.html',
                             {'bounds': {'width': 505, 'height': 565}});
});
{% endhighlight %}

Reload the app, right click anywhere and click "Inspect background page" and go to the "Console" tab, you should see the value we wrote in the last step in the console:

![Loading data on launch]({{ site.baseurl }}/images/chrome_todo_5.jpg)

In the code snippet shown above, "obj.todos" is used to refer to the data we saved (remember the key in the key/value pair we used while saving?). If the data is present in the storage, it will be saved to a global variable "stored_todos" which we can then read in the window (in **application.js**). But first we need to "get" the background page and in the resulting callback, we'll copy the value to window:

{% highlight javascript %}
onload = function() {
    chrome.runtime.getBackgroundPage(
        function (bg_page) {
            // Read the stored todos from the background page and save it to the window
            // Note: "window" variables can created on the fly...
            console.log(bg_page.stored_todos);
            window.stored_todos = bg_page.stored_todos;

            // Update the textarea with the stored todos
            if (window.stored_todos !== undefined) {
                document.getElementById('output').value = window.stored_todos;
            }
        }
    );

    document.getElementById('enter').onclick = function() {
        var txt = document.getElementById('output').value + '\r\n';
        txt += document.getElementById('text').value;
        document.getElementById('output').value = txt;

        // Save data to storage
        chrome.storage.sync.set({'todos': txt},
            function() {
                console.log('todos saved...');
            }
        );
    };
};
{% endhighlight %}

Reload the app now and you should be able to see the textarea initialized with the values that were saved earlier.

You can checkout the "sandbox" branch upto this point at the following commit (refer to this [post]({{ site.baseurl }}{% post_url 2015-05-25-git-reference %}) if you need a quick reference to Git commands for doing this):

<pre>
git checkout d84f1c1dc0f26e8bf3441f5117f306702416d697
</pre>
