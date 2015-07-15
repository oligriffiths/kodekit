// Overflowing checker
$.overflowing = function(element, options) {

    var defaults = {
            wrapInner: true
        },
        plugin = this;

    plugin.settings = {}

    var $element = $(element),
        element = element;

    plugin.init = function() {

        plugin.settings = $.extend({}, defaults, options);

        // Wrap content in a div
        if ( !$element.find('.overflowing').length ) {
            $element.wrap('<div class="overflowing">');
            if ( $element.css('flex') ) {
                $('.overflowing').addClass('overflowing--flex');
            }
        }

        // Overflowing?
        function overflowing() {

            if ( element.clientWidth != element.scrollWidth || element.clientHeight != element.scrollHeight ) {

                // Add top overflowing div
                if ( element.scrollTop != 0 && element.scrollTop != 0 && !$('.overflowing--top').length ) {
                    $element.after('<div class="overflowing--top">');
                }

                // Remove top overflowing div
                if ( element.scrollTop == 0 ) {
                    $('.overflowing--top').remove();
                }

                // Add right overflowing div
                if ( element.scrollLeft != element.scrollWidth - element.clientWidth && !$('.overflowing--right').length ) {
                    $element.after('<div class="overflowing--right">');
                }

                // Remove right overflowing div
                if ( element.scrollLeft == element.scrollWidth - element.clientWidth ) {
                    $('.overflowing--right').remove();
                }

                // Add bottom overflowing div
                if ( element.scrollTop != element.scrollHeight - element.clientHeight && !$('.overflowing--bottom').length
                ) {
                    $element.after('<div class="overflowing--bottom">');
                }

                // Remove bottom overflowing div
                if ( element.scrollTop == element.scrollHeight - element.clientHeight ) {
                    $('.overflowing--bottom').remove();
                }

                // Add left overflowing div
                if ( element.scrollLeft != 0 && !$('.overflowing--left').length ) {
                    $element.after('<div class="overflowing--left">');
                }

                // Remove left overflowing div
                if ( element.scrollLeft == 0 ) {
                    $('.overflowing--left').remove();
                }
            }

            if ( element.clientWidth == element.scrollWidth ) {
                $('.overflowing--left').remove();
                $('.overflowing--right').remove();
            }

            if ( element.clientHeight == element.scrollHeight ) {
                $('.overflowing--top').remove();
                $('.overflowing--bottom').remove();
            }
        }

        $(window).on('load resize', overflowing);

        // Detect on scrolling
        $element.scroll(function() {
            overflowing();
        });

    }

    plugin.init();
};

// add the plugin to the jQuery.fn object
$.fn.overflowing = function(options) {
    // iterate through the DOM elements we are attaching the plugin to
    return this.each(function() {
        // if plugin has not already been attached to the element
        if (undefined == $(this).data('responsiveMenu')) {
            // create a new instance of the plugin
            var plugin = new $.overflowing(this, options);
            // in the jQuery version of the element
            // store a reference to the plugin object
            $(this).data('overflowing', plugin);
        }
    });
};