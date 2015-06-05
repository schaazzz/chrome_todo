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
 * @file Manages the pop-up's behaviour.
 * @author Shahzeb Ihsan
 */

 /**
  * Keydown event handler (closes popup if Escape is pressed).
  * @param {KeyboardEvent} e Keyboard event.
  */
function keydown_handler(e){
    if(e.keyCode === 27){
        popup(null);
    }
}

/**
 * Implements the pop-up functionality.
 * @param {string} image_url Image URL, should be NULL when called to close popup.
 */
function popup (image_url){
    set_size_and_pos('blanket', 'popup');

    /* Set height to 'auto' to make the pop-up's contents fit nicely */
    var popup_div = document.getElementById('popup');
    popup_div.style.height = 'auto';

    if(image_url === null){
        document.body.removeEventListener("keydown_handler");
    } else {
        document.body.onkeydown = keydown_handler;
        document.getElementById('image').src = image_url;
    }

    toggle_visibility('blanket');
    toggle_visibility('popup');
}

/**
 * Toggle the visibility of the specified element.
 * @param {string} element_id ID of the element.
 */
function toggle_visibility(element_id) {
    var element = document.getElementById(element_id);

    if(element.style.display == 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

/**
 * Sets the blanket dimensions and pop-up position.
 * @param {string} blanket_id ID of the blanket section/div.
 * @param {string} popup_id ID of the pop-up section/div.
 */
function set_size_and_pos(blanket_id, popup_id) {
    var window_width = 0;
    var blanket_height = 0;
    var viewport_width = 0;
    var viewport_height = 0;

    /* Determine the viewport width and height */
    if (typeof window.innerWidth != 'undefined') {
        viewport_width = window.innerWidth;
        viewport_height = window.innerHeight;
    } else {
        viewport_width = document.documentElement.clientWidth;
        viewport_height = document.documentElement.clientHeight;
    }

    /* Determine the blanket's height */
    if ((viewport_height > document.body.parentNode.scrollHeight) &&
        (viewport_height > document.body.parentNode.clientHeight)) {
            blanket_height = viewport_height;
    } else {
        if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
            blanket_height = document.body.parentNode.clientHeight;
        } else {
            blanket_height = document.body.parentNode.scrollHeight;
        }
    }

    /* Set the blanket's height */
    var blanket = document.getElementById(blanket_id);
    blanket.style.height = blanket_height + 'px';

    /* Determine the pop-up's position such that it is centred on the blanket */
    var popup_div = document.getElementById(popup_id);
    var popup_div_top = (blanket_height / 2) - (get_div_dimensions_from_css('popup').height / 2);
    popup_div.style.top = popup_div_top + 'px';

    if ((viewport_width > document.body.parentNode.scrollWidth) &&
        (viewport_width > document.body.parentNode.clientWidth)) {
        window_width = viewport_width;
    } else {
        if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
            window_width = document.body.parentNode.clientWidth;
        } else {
            window_width = document.body.parentNode.scrollWidth;
        }
    }

    /* Set the pop-up's position */
    popup_div_top = (window_width / 2) - (get_div_dimensions_from_css('popup').width / 2);
    popup_div.style.left = popup_div_top + 'px';
}

/**
 * Get width and height defined in CSS for the specified section/div.
 * @param {string} div_id ID of the section/div.
 * @return {number|number} width, height Width and Height of the specified element.
 */
function get_div_dimensions_from_css(div_id) {
    var div_style = window.getComputedStyle(document.getElementById(div_id));

    var temp = div_style.getPropertyValue('width').split('px');
    temp = temp[0];
    var div_width = parseInt(temp);

    temp = div_style.getPropertyValue('height').split('px');
    temp = temp[0];
    var div_height = parseInt(temp);

    return {
        width: div_width,
        height: div_height
    };
}
