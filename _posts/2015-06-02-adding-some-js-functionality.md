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
        <input id = "text" placeholder= "Type something here...">
        <button id = "enter">Enter</button>
        <textarea id = "output" rows ="13" cols ="25" readonly>Data log...</textarea>

        <script src="js/application.js"></script>
    </body>
</html>
{% endhighlight %}
