---
layout: post
title: GIT Command Reference for this Tutorial
author: Shahzeb Ihsan
---

<!--more-->

For reference (mostly my own :stuck_out_tongue_winking_eye:), a few pointers about using "git" with the repository for this tutorial.

You can clone just the "sandbox" branch as follows:

<pre>
git  clone  -b  sandbox  --single-branch  https://github.com/schaazzz/simple_tcp_client.git
</pre>

Or, if you want to get the whole repository and then switch to the "sandbox" branch, do this:

<pre>
git  clone  https://github.com/schaazzz/simple_tcp_client.git
git  checkout  sandbox
</pre>

And if you want to work on this "sandbox" branch, just fork the [repository](https://github.com/schaazzz/simple_tcp_client/) :smile:

For the rest of this tutorial, we'll need to checkout specific commits, where certain commits constitute a step of the tutorial.

Once you are already on the "sandbox" branch, individual commits can be checked out using the following command (we'll ignore the warnings for now):

<pre>
git checkout b96f97f9dcbb95729b62a9eecd1d8b0c7b789330
</pre>
