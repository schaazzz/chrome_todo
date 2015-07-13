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

window.newProjectName = null;
window.addProjectStatus = false;
window.navBtnStates = {allTasks: false, today: false, nxt7Days: false};
window.selectedWorkspace = 'Inbox';
/**
 * Called on the "onload" event, sets event handlers for various elements.
 */
$(document).ready( function() {
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

    var x = `<div class = "newTask">
        <input type="text" id="taskName" name = "taskName"/>
        <input type="text" id="datepicker" name = "taskDate"/>
        <button class = "red">Add Task</button>
    </div>`

    $( "#patedicker" ).datepicker();
    $('#patedicker').append('<button>X</button>')

    $('#addTask').click(function(){
        $('#addTask').before(x);

    $( "#datepicker" ).datepicker({
        showButtonPanel: true,
        showOptions: {direction: "up"},
        beforeShow: function( input ) {
            setTimeout(function() {
                var buttonPane = $( input )
                    .datepicker( "widget" )
                    .find( ".ui-datepicker-buttonpane" );

                $( "<button>", {
                    text: "Clear",
                    click: function() {
                    //Code to clear your date field (text box, read only field etc.) I had to remove the line below and add custom code here
                        $.datepicker._clearDate( input );
                    }
                }).appendTo( buttonPane ).addClass("red");
            }, 1 );

        },
        onChangeMonthYear: function( year, month, instance ) {
            setTimeout(function() {
                var buttonPane = $( instance )
                    .datepicker( "widget" )
                    .find( ".ui-datepicker-buttonpane" );

                $( "<button>", {
                    text: "Clear",
                    click: function() {
                        $.datepicker._clearDate( instance.input );
                    }
                }).appendTo( buttonPane ).addClass("red");
            }, 1 );
        }
    });    });

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
