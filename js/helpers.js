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
 * @file Helper functions go here
 * @author Shahzeb Ihsan
 */

function navBtnEvtHandler(e) {
    var id = e.srcElement.id;
    var state = false;

    if (id == 'allTasks') {
        state = window.navBtnStates.allTasks;
    }
    else if (id == 'today') {
        state = window.navBtnStates.today;
    }
    else if (id == 'nxt7Days') {
        state = window.navBtnStates.nxt7Days;
    }

    if (e.type === 'onclick') {
        navBtnClickHandler(id);
    }
    else if (e.type == 'mouseover') {
        navBtnMouseoverHandler(id, state);
    }
    else if (e.type == 'mouseleave') {
        navBtnMouseleaveHandler(id, state);
    }
 }

function navBtnMouseleaveHandler(id, state) {
    var element = document.getElementById(id);
    if(!state) element.style.background = '#f5f5f5';
}

function navBtnMouseoverHandler(id, state) {
    var element = document.getElementById(id);
    if(!state) element.style.background = '#ffffff';
}

function clickHandler(id) {
    var elemAllTasks = document.getElementById('allTasks');
    var elemToday = document.getElementById('today');
    var elemNxt7Days = document.getElementById('nxt7Days');

    if (id == 'allTasks') {
        elemAllTasks.style.background = '#ffffff';
        elemTodaydocument.style.background = '#f5f5f5';
        elemNxt7Days.style.background = '#f5f5f5';

        window.navBtnStates.allTasks = true;
        window.navBtnStates.today = window.navBtnStates.nxt7Days = false;
    }
    else if (id == 'today') {
        elemAllTasks.style.background = '#f5f5f5';
        elemTodaydocument.style.background = '#ffffff';
        elemNxt7Days.style.background = '#f5f5f5';

        window.navBtnStates.today = true;
        window.navBtnStates.allTasks = window.navBtnStates.nxt7Days = false;
    }
    else if (id == 'nxt7Days') {
        elemAllTasks.style.background = '#f5f5f5';
        elemTodaydocument.style.background = '#f5f5f5';
        elemNxt7Days.style.background = '#ffffff';

        window.navBtnStates.nxt7Days = true;
        window.navBtnStates.allTasks = window.navBtnStates.today = false;
    }
}
