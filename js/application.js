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
 * @file Sets up application functionality
 * @author Shahzeb Ihsan
 */

/**
 * Called on the "onload" event, sets event handlers for various elements.
 */
onload = function() {
    /*chrome.runtime.getBackgroundPage(
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
    );*/

    /*document.getElementById('enter').onclick = function() {
        var txt = document.getElementById('output').value + '\r\n';
        txt += document.getElementById('text').value;
        document.getElementById('output').value = txt;

        // Save data to storage
        chrome.storage.sync.set({'todos': txt},
            function() {
                console.log('todos saved...');
            }
        );
    };*/

    document.getElementById('one').onclick = function() {
        document.getElementById('tab_selector').style.marginLeft = '3%';
        document.getElementsByClassName('projects_tab')[0].style.display = 'block';
        document.getElementsByClassName('labels_tab')[0].style.display = 'none';
        document.getElementsByClassName('filters_tab')[0].style.display = 'none';
    }

    document.getElementById('two').onclick = function() {
        document.getElementById('tab_selector').style.marginLeft = '28%';
        document.getElementsByClassName('projects_tab')[0].style.display = 'none';
        document.getElementsByClassName('labels_tab')[0].style.display = 'block';
        document.getElementsByClassName('filters_tab')[0].style.display = 'none';
    }

    document.getElementById('three').onclick = function() {
        document.getElementById('tab_selector').style.marginLeft = '55%';
        document.getElementsByClassName('projects_tab')[0].style.display = 'none';
        document.getElementsByClassName('labels_tab')[0].style.display = 'none';
        document.getElementsByClassName('filters_tab')[0].style.display = 'block';
    }
};
