/*
 JavaScript Dynamic Select Navigation v1.0.0
 by Todd Motto: http://www.toddmotto.com
 Latest version: https://github.com/toddmotto/selectnav
 
 Copyright 2013 Todd Motto
 Licensed under the MIT license
 http://www.opensource.org/licenses/mit-license.php
 
 Dynamically creates a select menu with nested capabilities
 */
function hasClassEmz(element, selector) {
    var className = " " + selector + " ";
    if ((" " + element.className + " ").replace(/[\n\t\r]/g, " ").indexOf(className) > -1) {
        return true;
    }

    return false;
}

function selectnav() {

    var select = document.createElement('select');
    var first = document.createElement('option');

    first.innerHTML = 'Menú';
    first.setAttribute('selected', 'selected');
    select.setAttribute('id', 'mobile');
    select.appendChild(first);

    var nav = document.getElementById('nav');
    var loadLinks = function (element, hyphen, level) {

        var e = element;
        var children = e.children;

        for (var i = 0; i < e.children.length; ++i) {

            var currentLink = children[i];

            switch (currentLink.nodeName) {
                case 'A':
                    var option = document.createElement('option');
                    option.innerHTML = (level++ < 1 ? '' : hyphen) + currentLink.innerHTML;
                    option.value = currentLink.href;
                    if ( hasClassEmz(currentLink,'box') || hasClassEmz(currentLink,'box2') ) {
                        option.setAttribute("data-to-box",currentLink.getAttribute("data-to-box"));
                    }
                    select.appendChild(option);
                    break;
                default:
                    if (currentLink.nodeName === 'UL') {
                        (level < 2) || (hyphen += hyphen);
                    }
                    loadLinks(currentLink, hyphen, level);
                    break;
            }
        }
    }

    loadLinks(nav, '- ', 0);

    nav.appendChild(select);

    var mobile = document.getElementById('mobile');

    if (mobile.addEventListener) {
        mobile.addEventListener('change', function () {
            var option = mobile.options[mobile.selectedIndex];
            if ( option.hasAttribute("data-to-box") ) {
                $("[data-box="+option.getAttribute("data-to-box")+"]").first().trigger("click");
            } else {
                window.location.href = option.value;
            }
        });
    } else if (mobile.attachEvent) {
        mobile.attachEvent('onchange', function () {
            var option = mobile.options[mobile.selectedIndex];
            if ( option.hasAttribute("data-to-box") ) {
                $("[data-box="+option.getAttribute("data-to-box")+"]").first().trigger("click");
            } else {
                window.location.href = option.value;
            }
        });
    } else {
        mobile.onchange = function () {
            var option = mobile.options[mobile.selectedIndex];
            if ( option.hasAttribute("data-to-box") ) {
                $("[data-box="+option.getAttribute("data-to-box")+"]").first().trigger("click");
            } else {
                window.location.href = option.value;
            }
        }
    }

}