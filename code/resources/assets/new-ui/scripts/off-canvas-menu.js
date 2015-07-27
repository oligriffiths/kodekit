/*!
 * jQuery.tabbable 1.0 - Simple utility for selecting the next / previous ':tabbable' element.
 * https://github.com/marklagendijk/jQuery.tabbable
 *
 * Includes ':tabbable' and ':focusable' selectors from jQuery UI Core
 *
 * Copyright 2013, Mark Lagendijk
 * Released under the MIT license
 *
 */
(function($){
    'use strict';

    /**
     * Focusses the next :focusable element. Elements with tabindex=-1 are focusable, but not tabable.
     * Does not take into account that the taborder might be different as the :tabbable elements order
     * (which happens when using tabindexes which are greater than 0).
     */
    $.focusNext = function(){
        selectNextTabbableOrFocusable(':focusable');
    };

    /**
     * Focusses the previous :focusable element. Elements with tabindex=-1 are focusable, but not tabable.
     * Does not take into account that the taborder might be different as the :tabbable elements order
     * (which happens when using tabindexes which are greater than 0).
     */
    $.focusPrev = function(){
        selectPrevTabbableOrFocusable(':focusable');
    };

    /**
     * Focusses the next :tabable element.
     * Does not take into account that the taborder might be different as the :tabbable elements order
     * (which happens when using tabindexes which are greater than 0).
     */
    $.tabNext = function(){
        selectNextTabbableOrFocusable(':tabbable');
    };

    /**
     * Focusses the previous :tabbable element
     * Does not take into account that the taborder might be different as the :tabbable elements order
     * (which happens when using tabindexes which are greater than 0).
     */
    $.tabPrev = function(){
        selectPrevTabbableOrFocusable(':tabbable');
    };

    function selectNextTabbableOrFocusable(selector){
        var selectables = $(selector);
        var current = $(':focus');
        var nextIndex = 0;
        if(current.length === 1){
            var currentIndex = selectables.index(current);
            if(currentIndex + 1 < selectables.length){
                nextIndex = currentIndex + 1;
            }
        }

        selectables.eq(nextIndex).focus();
    }

    function selectPrevTabbableOrFocusable(selector){
        var selectables = $(selector);
        var current = $(':focus');
        var prevIndex = selectables.length - 1;
        if(current.length === 1){
            var currentIndex = selectables.index(current);
            if(currentIndex > 0){
                prevIndex = currentIndex - 1;
            }
        }

        selectables.eq(prevIndex).focus();
    }

    /**
     * :focusable and :tabbable, both taken from jQuery UI Core
     */
    $.extend($.expr[ ':' ], {
        data: $.expr.createPseudo ?
            $.expr.createPseudo(function(dataName){
                return function(elem){
                    return !!$.data(elem, dataName);
                };
            }) :
            // support: jQuery <1.8
            function(elem, i, match){
                return !!$.data(elem, match[ 3 ]);
            },

        focusable: function(element){
            return focusable(element, !isNaN($.attr(element, 'tabindex')));
        },

        tabbable: function(element){
            var tabIndex = $.attr(element, 'tabindex'),
                isTabIndexNaN = isNaN(tabIndex);
            return ( isTabIndexNaN || tabIndex >= 0 ) && focusable(element, !isTabIndexNaN);
        }
    });

    /**
     * focussable function, taken from jQuery UI Core
     * @param element
     * @returns {*}
     */
    function focusable(element){
        var map, mapName, img,
            nodeName = element.nodeName.toLowerCase(),
            isTabIndexNotNaN = !isNaN($.attr(element, 'tabindex'));
        if('area' === nodeName){
            map = element.parentNode;
            mapName = map.name;
            if(!element.href || !mapName || map.nodeName.toLowerCase() !== 'map'){
                return false;
            }
            img = $('img[usemap=#' + mapName + ']')[0];
            return !!img && visible(img);
        }
        return ( /input|select|textarea|button|object/.test(nodeName) ?
                !element.disabled :
                'a' === nodeName ?
                element.href || isTabIndexNotNaN :
                    isTabIndexNotNaN) &&
                // the element and all of its ancestors must be visible
            visible(element);

        function visible(element){
            return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function(){
                    return $.css(this, 'visibility') === 'hidden';
                }).length;
        }
    }
})(jQuery);





(function($) {

    $.offCanvasMenu = function(element, options) {

        var defaults = {
                menu: $(element),
                position: 'left',
                menuExpandedClass: 'show-left-menu',
                openedClass: 'opened',
                noTransitionClass: 'no-transition',
                wrapper: $(element).parent(),
                container: $('.container'),
                menuToggle: [],
                expandedWidth: $(element).outerWidth(),
                offCanvasOverlay: 'off-canvas-overlay'
            },
            plugin = this;


        plugin.settings = {};

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

            var menu = plugin.settings.menu,
                position = plugin.settings.position,
                menuExpandedClass = plugin.settings.menuExpandedClass,
                openedClass = plugin.settings.openedClass,
                noTransitionClass = plugin.settings.noTransitionClass,
                wrapper = plugin.settings.wrapper,
                container = plugin.settings.container,
                menuToggle = plugin.settings.menuToggle,
                ariaControls = plugin.settings.ariaControls,
                expandedWidth = menu.outerWidth(),
                offCanvasOverlay = $('.' + plugin.settings.offCanvasOverlay),
                transitionDuration = Math.round(parseFloat(container.css('transition-duration')) * 1000),
                timeout;

            // Set proper menuExpandedClass if not set manually
            if ( position === 'right' && !options.menuExpandedClass ) {
                menuExpandedClass = 'show-right-menu';
            }

            // Set proper menuExpandedClass if not set manually
            if ( wrapper.is('body') ) {
                wrapper = $('html, body');
            }

            // Create overlay wrapper
            if ( !offCanvasOverlay.length ) {
                container.append('<div class="' + plugin.settings.offCanvasOverlay + '">');
            }

            // Get the overlay layer
            var overlay = $('.' + plugin.settings.offCanvasOverlay);

            function tabToggle(menu) {
                // When tabbing on toggle button
                menuToggle.bind('keydown', function(e) {
                    if (e.keyCode === 9 && wrapper.hasClass(menuExpandedClass) ) {
                        e.preventDefault();
                        if ( e.shiftKey ) {
                            menu.find(':tabbable').last().focus();
                        } else {
                            menu.find(':tabbable').first().focus();
                        }
                    }
                });

                // When tabbing on first tabbable menu item
                menu.find(':tabbable').first().bind('keydown', function(e) {
                    if (e.keyCode === 9 && wrapper.hasClass(menuExpandedClass) ) {
                        if ( e.shiftKey ) {
                            e.preventDefault();
                            menuToggle.focus();
                        }
                    }
                });

                // When tabbing on last tabbable menu item
                menu.find(':tabbable').last().bind('keydown', function(e) {
                    if (e.keyCode === 9 && wrapper.hasClass(menuExpandedClass) ) {
                        if ( !e.shiftKey ) {
                            e.preventDefault();
                            menuToggle.focus();
                        }
                    }
                });
            }

            function openMenu(menu) {
                // Clear the timeout when user clicks open menu
                clearTimeout(timeout);

                // Set to expanded for accessibility
                menuToggle.attr({'aria-expanded': 'true'});

                // Add classes and CSS to the wrapper
                // All styling in CSS comes from this parent element
                wrapper.addClass(menuExpandedClass + ' ' + openedClass + '--' + position).css({'overflow-x': 'hidden', 'position': 'relative'});

                // Enable tabbing within menu
                tabToggle(menu);
            }

            function closeMenu() {
                // Set to collapsed for accessibility
                menuToggle.attr({'aria-expanded': 'false'});

                // Remove the expanded class to activate the transition
                wrapper.removeClass(menuExpandedClass);

                // Remove style and class when transition has ended, so the menu stays visible on closing
                timeout = setTimeout(function() {
                    wrapper.removeClass(menuExpandedClass + ' ' + openedClass + '--' + position).removeAttr('style');
                }, transitionDuration);
            }

            function toggleMenu(menu) {
                var method = !wrapper.hasClass(menuExpandedClass) ? 'closed' : 'opened';
                if ( method === 'closed' ) { openMenu(menu); }
                if ( method === 'opened' ) { closeMenu(); }
            }

            // If we have a toggle button available
            if(menuToggle.length){

                // Set ARIA attributes
                menuToggle.attr({
                    'role': 'button',
                    'aria-controls': ariaControls,
                    'aria-expanded': 'false'
                });

                // Toggle button:
                menuToggle.click(function(event){
                    event.stopPropagation();
                    toggleMenu(menu);
                });

                // Close menu by clicking anywhere
                wrapper.click(function(event){
                    if ( wrapper.hasClass(menuExpandedClass) ) {
                        event.stopPropagation();
                        closeMenu();
                    }
                });

                // Don't close the menu when clicked on sidemenu
                menu.click(function(event){
                    event.stopPropagation();
                });

                // Close menu if esc keydown and menu is open and set focus to toggle button
                $(document).bind('keydown', function(event) {
                    if (event.keyCode === 27 && wrapper.hasClass(menuExpandedClass)) {
                        event.stopPropagation();
                        closeMenu();
                        menuToggle.focus();
                    }
                });
            }


            // Touch actions
            if ('ontouchstart' in document.documentElement) {
                wrapper.on('touchstart', onTouchStart);
                wrapper.on('touchmove', onTouchMove);
                wrapper.on('touchend', onTouchEnd);
            }

            // vars
            var started = null,
                start = {},
                deltaX,
                pageX,
                overlayOpacity,
                isScrolling = false;

            // Functions
            function currentPosition() {
                return position == 'left' ? menu.offset().left + expandedWidth
                    : menu.offset().left;
            }

            function inBounds(newPos) {
                return (position == 'left' && newPos >= -25 && newPos <= expandedWidth) ||
                    (position == 'right' && newPos >= -(expandedWidth) && newPos <= 25);
            }

            function onTouchStart(e) {

                // Escape if Menu is closed
                if(!wrapper.hasClass(menuExpandedClass))
                    return;

                // Set started to true (used by touchend)
                started = true;

                // Get original starting point
                pageX = e.originalEvent.touches[0].pageX;

                // Setting the start object for 'move' and 'end'
                start = {
                    startingX: currentPosition(),
                    // get touch coordinates for delta calculations in onTouchMove
                    pageX: pageX,
                    pageY: e.originalEvent.touches[0].pageY
                };

                // reset deltaX
                deltaX = wrapper.position().left;

                // used for testing first onTouchMove event
                isScrolling = undefined;

                // Get the opacity of the overlay
                overlayOpacity = overlay.css('opacity');

                // Add class to remove transition for 1-to-1 touch movement
                container.addClass(noTransitionClass);
                overlay.addClass(noTransitionClass);

                e.stopPropagation();
            }

            function onTouchMove(e) {

                deltaX = e.originalEvent.touches[0].pageX - start.pageX;

                // determine if scrolling test has run - one time test
                if (typeof isScrolling == 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(deltaX) < Math.abs(e.originalEvent.touches[0].pageY - start.pageY));
                }

                // if user is not trying to scroll vertically
                if (!isScrolling) {

                    // prevent native scrolling
                    e.preventDefault();

                    var newPos = position == 'left' ? start.startingX + deltaX
                        : deltaX - ($(window).width() - start.startingX);

                    var opacity = (overlayOpacity / expandedWidth) * Math.abs(newPos);

                    if(!inBounds(newPos))
                        return;

                    // translate immediately 1-to-1
                    container.css({
                        '-webkit-transform' : 'translate(' + newPos + 'px, 0)',
                        '-moz-transform'    : 'translate(' + newPos + 'px, 0)',
                        '-ms-transform'     : 'translate(' + newPos + 'px, 0)',
                        '-o-transform'      : 'translate(' + newPos + 'px, 0)',
                        'transform'         : 'translate(' + newPos + 'px, 0)'
                    });
                    overlay.css('opacity', opacity);

                    e.stopPropagation();
                }


            }

            function onTouchEnd(e){

                // Escape if invalid start:
                if(!started)
                    return;

                // Escape if Menu is closed
                if(!wrapper.hasClass(menuExpandedClass))
                    return;

                var newPos = position == 'left' ? start.startingX + deltaX
                    : deltaX - ($(window).width() - start.startingX);

                // Converting to positive number
                var absNewPos = Math.abs(newPos);

                // if not scrolling vertically
                if (!isScrolling) {

                    container.removeAttr('style').removeClass(noTransitionClass);
                    overlay.removeAttr('style').removeClass(noTransitionClass);

                    if ( ( position == 'left' && ( absNewPos <= (expandedWidth * 0.66) || newPos <= 0 ) ) ||
                        ( position == 'right' && ( absNewPos <= (expandedWidth * 0.66) || newPos >= 0 ) ) ) {
                        closeMenu();
                    } else {
                        openMenu(menu);
                    }
                }

                // Reset start object and starting variable:
                started = null;
                start = {};

                e.stopPropagation();
            }

        };

        plugin.init();

    };


    // add the plugin to the jQuery.fn object
    $.fn.offCanvasMenu = function(options) {
        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {
            // if plugin has not already been attached to the element
            if (undefined == $(this).data('offCanvasMenu')) {
                // create a new instance of the plugin
                var plugin = new $.offCanvasMenu(this, options);
                // in the jQuery version of the element
                // store a reference to the plugin object
                $(this).data('offCanvasMenu', plugin);
            }
        });
    };

})(jQuery);
