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

var Task = function(name, dueDate, priority, done, setAlarm, project) {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done;
    this.project = project;
    this.hash = calcHash();
    this.alarm = null;

    if(setAlarm && dueDate) {
        this.alarm = 'alarm' + this.hash;

        var d = new Date(this.dueDate);
        chrome.alarms.create(
                        this.alarm,
                        {when: d.getTime()});
    }

    function calcHash() {
        var hashVal = 0;
        var str = name + '' + dueDate + '' + new Date().getTime();

        for(i = 0; i < str.length; i++) {
            hashVal = (hashVal << 5) + str.charCodeAt(i);
            hashVal &= hashVal;
        }
        return Math.abs(hashVal);
    }
};

function navBtnEvtHandler(e) {
    var id = '#' + e.target.id;
    var state = false;

    if (id == '#allTasks') {
        state = window.navBtnStates.allTasks;
    } else if (id == '#today') {
        state = window.navBtnStates.today;
    } else if (id == '#nxt7Days') {
        state = window.navBtnStates.nxt7Days;
    }

    if (e.type === 'click') {
        navBtnClickHandler(id);
    } else if (e.type == 'mouseenter') {
        if(!state) $(id).css('background', '#fffFff');
    } else if (e.type == 'mouseleave') {
        if(!state) $(id).css('background', '#f5f5f5');
    }
 }

function navBtnClickHandler(id) {
    var elemAllTasks = $('#allTasks');
    var elemToday = $('#today');
    var elemNxt7Days = $('#nxt7Days');

    if (id == '#allTasks') {
        $('#allTasks').css('background', '#ffffff');
        $('#today').css('background', '#f5f5f5');
        $('#nxt7Days').css('background', '#f5f5f5');

        window.selectedWorkspace = 'Inbox';
        window.navBtnStates.allTasks = true;
        window.navBtnStates.today = window.navBtnStates.nxt7Days = false;

        $('#filterTasks').attr('placeholder', 'Filter tasks');

    } else if (id == '#today') {
        $('#allTasks').css('background', '#f5f5f5');
        $('#today').css('background', '#ffffff');
        $('#nxt7Days').css('background', '#f5f5f5');

        window.selectedWorkspace = 'Today';
        window.navBtnStates.today = true;
        window.navBtnStates.allTasks = window.navBtnStates.nxt7Days = false;

        $('#filterTasks').attr('placeholder', 'overdue, today');
    } else if (id == '#nxt7Days') {
        $('#allTasks').css('background', '#f5f5f5');
        $('#today').css('background', '#f5f5f5');
        $('#nxt7Days').css('background', '#ffffff');

        window.selectedWorkspace = 'Next 7 Days';
        window.navBtnStates.nxt7Days = true;
        window.navBtnStates.allTasks = window.navBtnStates.today = false;

        $('#filterTasks').attr('placeholder', 'overdue, 7 days');
    }

    $('#selectedWorkspace').text(window.selectedWorkspace);
}

function addProject() {
    if(!window.addProjectStatus) {
        window.addProjectStatus = true;

        $('#addProject').before('<input id = "projectName" type = "text" placeholder = "Project Name"/>');
        $('#projectName').focus();

        $('#projectName').keyup(function(e) {
            var pattern = RegExp('^[A-Za-z0-9_]+$');

            if(e.keyCode == 27) {
                $('#projectName').remove();
                window.addProjectStatus = false;
                window.newProjectName = null;
            }

            if(e.keyCode == 13) {
                name = $('#projectName').val();
                if(pattern.test(name)) {
                    $('#projectName').css('background', '#ffffff');
                    window.newProjectName = name;
                }
                else {
                    $('#projectName').css('background', 'pink');
                }
            }

            if(window.newProjectName) {
                $('#addProject').before(
                                '<button id = "allTasks" class="large">' +
                                    '<i class="fa fa-circle" style = "color: tomato !important;"></i>' +
                                    '&nbsp;' + window.newProjectName +
                                '</button>');

                $('#projectName').remove();
                window.addProjectStatus = false;
                window.newProjectName = null;
            }
        });
    }
}

function taskHoverIn() {
    $(this).css('background-color','#fafafa');
    $('#' + this.id + ' > #editIcon').css('color', '#cacaca');
}

function taskHoverOut() {
    $(this).css('background-color','white');
    $('#' + this.id + ' > #editIcon').css('color', '#ffffff');
}

function populateTasks() {
    for(i = 0; i < window.storedTasks.length; i++) {
        if(!window.storedTasks[i].done) {
            $('#addTask').after(
                            '<div id = "div' + window.storedTasks[i].hash + '" class = "showTask">' +
                                '<input id = "' + window.storedTasks[i].hash + '" type = "checkbox"/>' +
                                '<label for = "' + window.storedTasks[i].hash + '"></label>' +
                                '<p>' + window.storedTasks[i].name + '</p>' +
                                '<a href = #>' + window.storedTasks[i].dueDate + '</a>' +
                                '<a id = "editIcon" name = "editIcon' + window.storedTasks[i].hash + '" href = #><i class = "fa fa-ellipsis-h"></i></a>' +
                            '</div>');

            $('#div' + window.storedTasks[i].hash).hover(taskHoverIn, taskHoverOut);
            $('#' + window.storedTasks[i].hash).click(handleTaskClick);
            $('[name = "editIcon' + window.storedTasks[i].hash + '"]').click(handleTaskEdit);
        }
    }
}

function handleTaskEdit() {
    children = $(this).parent().children();
    taskName = $(children[2]).text();
    taskDate = $(children[3]).text();

    window.editedTaskDiv = $(this).parent();
    window.editedTaskDate = taskDate;
    window.editedTaskName = taskName;
    window.taskEditingInProgress = true;

    $('#addTask').trigger('click');
    $('#taskName').val(taskName);
    $('#taskDate').val(taskDate);
}

function handleTaskClick(e) {
    var done = false;
    var hash = e.target.id;

    done = $('#' + hash).is(':checked') ? true : false;

    for(i = 0; i < window.storedTasks.length; i++) {
        if(window.storedTasks[i].hash.toString() === hash) {
            if(done) {
                $('label[for = "' + hash + '"] + p').css('text-decoration', 'line-through');
                $('label[for = "' + hash + '"] + p + a').text('');
            }
            else {
                $('label[for = "' + hash + '"] + p').css('text-decoration', 'none');
                $('label[for = "' + hash + '"] + p + a').text(window.storedTasks[i].dueDate);
            }

            window.storedTasks[i].done = done;

            /* Save data to storage */
            chrome.storage.sync.set(
                        {'tasks': window.storedTasks},
                        function() {});
        }
    }
}

function dateShortcutHandler(e) {
    var source = e.currentTarget.attributes.name.nodeValue;

    if(source === 'dateToday') {
        $('#taskDate').val(formatDate(new Date().toString()));
    }
    else if(source === 'dateTomorrow') {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        $('#taskDate').val(formatDate(tomorrow.toString()));
    }
    else if(source === 'dateNextWeek') {
        var today = new Date();
        var nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        $('#taskDate').val(formatDate(nextWeek.toString()));
    }
    else if(source === 'dateNextMonth') {
        var today = new Date();
        var nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 1);
        $('#taskDate').val(formatDate(nextMonth.toString()));
    }
    else if(source === 'dateClear') {
        $('#taskDate').val('');
    }

    if(source !== 'dateClear') {
        $('#taskDate').val($('#taskDate').val() + ' @ ' + $('#selectTime').val());
    }

    return true;
}

function formatDate(dateString) {
    dateString = dateString.split(' ');
    return (dateString[2] + ' ' + dateString[1] + ' ' + dateString[3]);
}

function toggleTaskIcon(name, state) {
    if(state) {
        $('a[name = "' + name + '"]').css('color', '#000000');
    } else {
        $('a[name = "' + name + '"]').css('color', '#c0c0c0');
    }
}

function setPriorityFlagStyle(color, newIcon, index, opacity) {
    var html = $('a[name = "setPriority"]').html();
    html = html.replace('-o', '');
    html = html.replace('fa-flag', newIcon);
    $('a[name = "setPriority"]').html(html);

    $('a[name = "setPriority"]').css('color', color);
    $('a[name = "setPriority"]').css('opacity', opacity);

    $('#taskPriority').children('a').each(function(i, v) {
        if(i == index) {
            $(v).css('border-color', '#505050');
        } else {
            $(v).css('border-color', '#ffffff');
        }
    });
}

function addTask() {
    addTaskHtml =
            '<div class = "newTask" id = "newTask">' +
                '<input type = "text" id = "taskName"/>' +
                '<input type = "text" id = "taskDate" placeholder = "no due date"/>' +
                '<button id = "createTask" class = "red">Add Task</button>' +
                '<a id = "cancelAddTask" href = #>Cancel</a>' +
                '<a id="icon" style = "margin-right: 50px;" name = "setPriority" href=#><i class="fa fa-flag-o"></i></a>' +
                '<a id="icon" style = "margin-right: 15px;" name = "setAlarm" href=#><i class="fa fa-bell"></i></a>' +
            '</div>';

    if(!window.addTaskStatus) {
        var setAlarm = false;
        var newPriority = 0;

        if(window.taskEditingInProgress) {
            $(window.editedTaskDiv).replaceWith(addTaskHtml);
        }
        else {
            $('#addTask').after(addTaskHtml);
        }

        window.addTaskStatus = true;
        $('#taskName').focus();

        $('a[name = "setAlarm"]').click(function() {
            setAlarm = !setAlarm;
            toggleTaskIcon('setAlarm', setAlarm);
        });

        $('a[name = "setPriority"]').click(function(e) {
            $('#semiXOverlay').css('display', 'block');
            $('#taskPriorityBorder').css('display', 'block');
            $('#taskPriority').focus();
        });

        $('#taskPriority').keyup(function(e) {
            if(e.keyCode == 27) {
                $('#semiXOverlay').css('display', 'none');
                $('#taskPriorityBorder').css('display', 'none');
            }
        });

        $('a[priority = "0"]').click(function(e) {newPriority = 0; setPriorityFlagStyle('#c0c0c0', 'fa-flag-o', newPriority, 1);});
        $('a[priority = "1"]').click(function(e) {newPriority = 1; setPriorityFlagStyle('lightblue', 'fa-flag', newPriority, 1);});
        $('a[priority = "2"]').click(function(e) {newPriority = 2; setPriorityFlagStyle('pink', 'fa-flag', newPriority, 1);});
        $('a[priority = "3"]').click(function(e) {newPriority = 3; setPriorityFlagStyle('orange', 'fa-flag', newPriority, 1);});
        $('a[priority = "4"]').click(function(e) {newPriority = 4; setPriorityFlagStyle('red', 'fa-flag', newPriority, 1);});

        $('#cancelAddTask').click(function() {
            $('#newTask').remove();
            window.addTaskStatus = false;
            window.taskEditingInProgress = false;
            setAlarm = false;
        });

        $('#createTask').click(function() {
            if($('#taskName').val() !== '') {
                var tempDate = new Date($('#taskDate').val());
                var dateString = ('Invalid Date' === tempDate.toString()) ?  '' : tempDate.toString().split(' ');
                if (dateString !== '') {
                    dateString = dateString[2] + ' ' + dateString[1] + ' ' + dateString[3] +
                                ' @ ' +
                                dateString[4].split(':')[0] + ':' + dateString[4].split(':')[1];
                }

                var task = new Task(
                                $('#taskName').val(),
                                dateString,
                                newPriority,
                                false,
                                setAlarm,
                                null);

                $('#taskName').val('');
                $('#taskDate').val('');
                toggleTaskIcon('setAlarm', false);
                setPriorityFlagStyle('#c0c0c0', 'fa-flag-o', 0, 0.5);

                $('a[name = "setPriority"]').hover(
                    function() {
                        $('a[name = "setPriority"]').css('opacity', '1');
                    }, function() {
                        $('a[name = "setPriority"]').css('opacity', '0.5');
                    }
                );

                if(setAlarm) {
                    setAlarm = false;
                }

                $('#newTask').after(
                                '<div id = "div' + task.hash + '" class = "showTask">' +
                                    '<input id = "' + task.hash + '" type = "checkbox"/>' +
                                    '<label for = "' + task.hash + '"></label>' +
                                    '<p>' + task.name + '</p>' +
                                    '<a href = #>' + task.dueDate + '</a>' +
                                    '<a id = "editIcon" name = "editIcon' + task.hash + '" href = #><i class = "fa fa-ellipsis-h"></i></a>' +
                                '</div>');

                $('#div' + task.hash).hover(taskHoverIn, taskHoverOut);
                $('[name = "editIcon' + task.hash + '"]').click(handleTaskEdit);

                window.storedTasks.push(task);
                $('#' + task.hash).click(handleTaskClick);

                /* Save data to storage */
                chrome.storage.sync.set(
                            {'tasks': window.storedTasks},
                            function() {});

                if(window.taskEditingInProgress) {
                    $('#cancelAddTask').trigger('click');
                    window.taskEditingInProgress = false;
                }
            }
        });

        $('#taskDate').click(function() {
            var top = $('#taskDate').offset().top + parseInt($('#taskDate').css('height'));
            var left = $('#taskDate').position().left;

            $('#calendarBorder').css('top', top);
            $('#calendarBorder').css('left', left);

            if(window.taskEditingInProgress) {
                $('#selectTime').val($('#taskDate').val().split(' @ ')[1]);
            }

            $('#datepicker').datepicker({
                altField: '#taskDate',
                altFormat: 'dd M yy',
                dateFormat: 'dd M yy',
                defaultDate: new Date($('#taskDate').val().split(' @ ')[0]),
                onSelect: function(date) {
                    $('#semiXOverlay').css('display', 'none');
                    $('#calendarBorder').css('display', 'none');
                    $('#taskDate').val($('#taskDate').val() + ' @ ' + $('#selectTime').val());
                }
            });

            $('#semiXOverlay').css('display', 'block');
            $('#calendarBorder').css('display', 'block');

            var width = parseInt($('#datepicker').css('width'));
            var height = parseInt($('#datepicker').css('height'));
            $('#datepicker').css('marginLeft', (-1 * width) / 2);
            $('#calendarBorder').css('width', width);
            $('#calendarBorder').css('min-height', height);
            $('#datepicker').focus();
            $('#scheduleToday').text(new Date().getDate());

            $('#selectTime').click(function(e) {
                return false;
            });

            $('#datepicker').keyup(function(e) {
                if(e.keyCode == 27) {
                    $('#semiXOverlay').css('display', 'none');
                    $('#calendarBorder').css('display', 'none');

                    if(window.taskEditingInProgress) {
                        $('#taskDate').val(window.editedTaskDate);
                        window.taskEditingInProgress = false;
                    }
                }
            });
        });

        $('#semiXOverlay').click(function() {
            $('#semiXOverlay').css('display', 'none');
            $('#calendarBorder').css('display', 'none');
            $('#taskPriorityBorder').css('display', 'none');

            if(window.taskEditingInProgress) {
                $('#taskDate').val(window.editedTaskDate);
                window.taskEditingInProgress = false;
            }
        });

        $('#taskName').keyup(function(e) {
            if(e.keyCode == 27) {
                $('#newTask').remove();
                window.addTaskStatus = false;
                setAlarm = false;
            }

            if(e.keyCode == 13) {
                $('#createTask').trigger('click');
            }
        });
    }
}
