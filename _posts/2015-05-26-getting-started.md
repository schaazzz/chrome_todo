---
layout: post
title: Step 1 - Getting Started
author: Shahzeb Ihsan
---

The "master" branch for this project's repository contains the finished code, so I've created a new branch called "sandbox", in which we'll go through incremental steps of developing a packaged Chrome application.

In case you, like me, are relatively new to GIT, I've added a [post]({{ site.baseurl }}{% post_url 2015-05-25-git-reference %}) containing references to some git commands that we'll need for this tutorial.

<!--more-->

OK, lets get started now.


* Go to **chrome://extensions/** and enable "Developer mode" so we can load an unpacked extension.

![Enable "Developer mode" in Chrome]({{ site.baseurl }}/images/chrome_developer_mode.jpg)

* <u>**Optional**</u>: Install [Chrome Dev Editor](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg?hl=en). "Chrome Dev Editor" is an IDE for building Chrome apps, it is relatively bare-bones as far as modern IDEs go but, nonetheless, a great tool for getting started with Chrome apps. I have this **TBD** tutorial on how to get started with using "Chrome Dev Editor" to develop a Chrome app.

## Components of a Chrome App
A Chrome app contains...

1. A manifest file containing your app's meta data e.g. name, version, properties and required permissions
2. Event page (backgroud script) which manages your app's life cycle, this is where all your app's listeners for window events would be registered
3. Code files (HTML, CSS, JS) - these are packaged in the app but for now, we will just use the 'unpacked' app folder
4. Assets (images, icons etc.)

More details [here](https://developer.chrome.com/apps/app_codelab_basics#app-components).

[Next Step: Creating the Manifest (manifest.json)]({{ site.baseurl }}{% post_url 2015-05-27-creating-the-manifest %})
