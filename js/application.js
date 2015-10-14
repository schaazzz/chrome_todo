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

window.addTaskStatus = false;
window.newProjectName = null;
window.addProjectStatus = false;
window.navBtnStates = {allTasks: false, today: false, nxt7Days: false};
window.selectedWorkspace = 'Inbox';
window.taskEditingInProgress = false;
window.editedTaskDate = '';
window.editedTaskName = '';
window.editedTaskDiv = null;

/**
 * Called on the "onload" event, sets event handlers for various elements.
 */
$(document).ready( function() {
    chrome.runtime.getBackgroundPage(
        function (backgroundPage) {
            /* Read the stored todos from the background page and save it to the window */
            window.storedTasks = backgroundPage.storedTasks;
            populateTasks();
        }
    );

    $('#addTask').click(addTask);

    $('a[name = "dateToday"]').click(dateShortcutHandler);
    $('a[name = "dateTomorrow"]').click(dateShortcutHandler);
    $('a[name = "dateNextWeek"]').click(dateShortcutHandler);
    $('a[name = "dateNextMonth"]').click(dateShortcutHandler);
    $('a[name = "dateClear"]').click(dateShortcutHandler);

    window.navBtnStates.allTasks = true;
    $('#allTasks').css('background', '#ffffff');

    $('#allTasks').click(navBtnEvtHandler);
    $('#allTasks').hover(navBtnEvtHandler, navBtnEvtHandler);

    $('#today').click(navBtnEvtHandler);
    $('#today').hover(navBtnEvtHandler, navBtnEvtHandler);

    $('#nxt7Days').click(navBtnEvtHandler);
    $('#nxt7Days').hover(navBtnEvtHandler, navBtnEvtHandler);

    $('#addProject').click(addProject);

    document.getElementById('one').onclick = function() {
        document.getElementById('tab_selector').style.marginLeft = '3%';
        document.getElementsByClassName('projectsTab')[0].style.display = 'block';
        document.getElementsByClassName('labelsTab')[0].style.display = 'none';
        document.getElementsByClassName('filtersTab')[0].style.display = 'none';
    };

    document.getElementById('two').onclick = function() {
        document.getElementById('tab_selector').style.marginLeft = '28%';
        document.getElementsByClassName('projectsTab')[0].style.display = 'none';
        document.getElementsByClassName('labelsTab')[0].style.display = 'block';
        document.getElementsByClassName('filtersTab')[0].style.display = 'none';
    };

    document.getElementById('three').onclick = function() {
        document.getElementById('tab_selector').style.marginLeft = '55%';
        document.getElementsByClassName('projectsTab')[0].style.display = 'none';
        document.getElementsByClassName('labelsTab')[0].style.display = 'none';
        document.getElementsByClassName('filtersTab')[0].style.display = 'block';
    };
});
