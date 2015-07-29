/**
 *---------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Shahzeb Ihsan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * ---------------------------------------------------------------------
 * @file Background javascript file for Chrome extension.
 * @author Shahzeb Ihsan
 */

var storedTasks = [];
var pendingAlarms = [];

/**
 * 'onLaunched' listener
 */
chrome.app.runtime.onLaunched.addListener(function() {
    /* Read data from storage */
    chrome.storage.sync.get('tasks', function(obj) {
        if (obj.tasks === undefined) {
            storedTasks = [];
        }
        else {
            storedTasks = obj.tasks;
        }
    });

    // Create the HTML view
    chrome.app.window.create('window.html', {
                                'id': 'tomatoWinID',
                                'resizable': false,
                                'innerBounds': {
                                    'width': 1025,
                                    'height': 775
                                },
                            });
});

/**
 * 'onAlarm' listener
 */
chrome.alarms.onAlarm.addListener(function(alarm) {
    pendingAlarms.push(alarm.name);

    /* Read data from storage */
    chrome.storage.sync.get('tasks', function(obj) {
        tasks = obj.tasks;
        alarm = pendingAlarms.pop();

        for(i = 0; i < tasks.length; i++) {
            if(tasks[i].alarm === alarm) {
                var opt = {
                    type: 'basic',
                    title: tasks[i].name,
                    message: 'Task "' + tasks[i].name + '" due today...',
                    iconUrl: 'icons/tomato.png'
                };
                chrome.notifications.create('', opt, null);
             }
         }
    });
});
