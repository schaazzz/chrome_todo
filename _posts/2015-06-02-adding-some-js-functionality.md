---
layout: post
title: Step 5 - Adding JavaScript Functionality
author: Shahzeb Ihsan
---

[Previous Step: Creating the HTML View]({{ site.baseurl }}{% post_url 2015-05-28-creating-the-html-view %})

In folder "js", create a file called "application.js" and add the js path to the <em>end</em> of your HTML body (window.html)...

{% highlight html %}
<html>
    <head>
        <meta charset="utf-8">
        <title>Chrome ToDo</title>
    </head>

    <body>
        <input id="text" placeholder="Type something here...">
        <button id="enter">Enter</button>
        <textarea id="output" rows="13" cols="25" readonly>Data log...</textarea>

        <script src="js/application.js"></script>
    </body>
</html>
{% endhighlight %}

For the JavaScript functionality, all we are going to do right now is to add anything typed in the <em>input</em> to the <em>textarea</em> when the <em>button</em> is pressed.

{% highlight javascript %}
/**
 * Called on the "onload" event, sets event handlers for various elements.
 */
onload = function() {
    document.getElementById('enter').onclick = function() {
        // When the "Enter" button is pressed, text is read from the input
        // and updated in the textarea
        var txt = document.getElementById('output').value + '\r\n';
        txt += document.getElementById('text').value;
        document.getElementById('output').value = txt;
    };
};
{% endhighlight %}

Now, go to **chrome://extensions** and reload your app and launch your application.
![Type something in the text field and click the "Enter" button]({{ site.baseurl }}/images/chrome_todo_1.jpg)

There you go, a fully functional, albeit useless, Chrome app :monkey_face:
