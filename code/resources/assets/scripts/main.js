(function($) {

    $(document).ready(function () {

        // Variables
        var $wrapper = $('.k-wrapper'),
            $titlebar = $('.k-titlebar'),
            $toolbar = $('.k-toolbar'),
            $content = $('.k-content'),
            $fixedtable = $('.table--fixed'),
            $select2default = $('.select2--default'),
            $select2filter = $('.select2--filter select'),
            $tree = $('.k-clicker'),
            $magnificframe = $('.mfp-iframe'),
            $clickable = $('a, button'),
            $searchtoggle = $('.k-toggle-search');

        // Sidebar
        if ( ($toolbar.length || $titlebar.length) && $wrapper.length && $content.length)
        {
            var toggle_button = '<div class="off-canvas-menu-toggle-holder"><button class="off-canvas-menu-toggle" type="button">' +
                '<span class="bar1"></span>' +
                '<span class="bar2"></span>' +
                '<span class="bar3"></span>' +
                '</button></div>',
                sidebar_left  = $('#k-sidebar'),
                sidebar_right = $('#k-sidebar-right');

            if (sidebar_left.length) {
                var left_toggle = $(toggle_button);

                if ($titlebar.length) {
                    $titlebar.prepend(left_toggle);
                } else if ($toolbar.length) {
                    $toolbar.prepend(left_toggle);
                }

                sidebar_left.offCanvasMenu({
                    menuToggle: left_toggle,
                    wrapper: $wrapper,
                    container: $content
                });
            }

            if (sidebar_right.length) {
                var right_toggle = $(toggle_button);

                if ($titlebar.length) {
                    $titlebar.append(right_toggle);
                } else if ($toolbar.length) {
                    $toolbar.append(right_toggle);
                }

                sidebar_right.offCanvasMenu({
                    menuToggle: right_toggle,
                    wrapper: $wrapper,
                    container: $content,
                    position: 'right'
                });
            }

            // Overflowing sidebar items
            $('.k-sidebar__item--overflow').overflowing();
        }

        // Footable
        $('.footable').footable({
            breakpoints: {
                phone: 400,
                tablet: 600
            }
        }).bind('footable_resizing', function() {
            $fixedtable.floatThead('destroy');
        }).bind('footable_resized', function() {
            fixedTable();
        });

        // WP sidebar toggle
        $('#collapse-menu').on('click', function() {
            $fixedtable.floatThead('destroy');
            fixedTable();
        });

        // Sticky table header and footer
        function fixedTable() {
            if ( $fixedtable.length ) {
                $fixedtable.floatThead({
                    scrollContainer: function($table){
                        return $table.closest('.k-table');
                    },
                    enableAria: true
                });
            }
        }

        fixedTable();

        // Clickable items
        if ( $clickable.length ) {
            $clickable.click(function() {
                $(this).toggleClass('k-opened');
            });
        }

        // Enable Select2 for all selectboxes within a select2 class container
        if ( $select2default.length ) {
            $select2default.select2();
        }

        // Enable Select2 for all selectboxes within a select2 class container
        if ( $select2filter.length ) {
            $select2filter.find('option:first').val('').html('');
            $select2filter.select2({
                minimumResultsForSearch: Infinity,
                allowClear: true
            });
        }

        // The tree
        if ( $tree.length ) {
            $tree.click(function(event) {
                event.stopPropagation();
                var element = $(this).parent();
                element.toggleClass('toggled').next('ul').toggleClass('opened').slideToggle('fast');
            });
        }

        // Magnific popup
        if ( $magnificframe.length ) {
            $magnificframe.magnificPopup({
                type: 'iframe',
                mainClass: 'koowa_dialog_modal'
            });
        }

        // Toggle search
        $searchtoggle.click(function() {
            $('.k-scopebar__item--search').slideToggle('fast');
        });


        // Toggle the filter bar and the filter button content
        $('.k-scopebar__filter-button').on('click', function() {
            $(this).toggleClass('k-scopebar__filter-button--reset');
            $(this).find('.add-filter').toggle();
            $(this).find('.clear-filter').toggle();
            $('[data-filter="all"]').slideToggle('fast');
        }).trigger('click');

        // Special theme for the select2 filters in the scopebar (tiny theme)
        /*$('.select2-filter').select2({
            theme: "tiny"
        });

        // Special theme for the select2 filters in the scopebar (tiny theme)
        $('.select2-filter--no-search').select2({
            theme: "tiny"
        });*/

        // TEMP: Show the second group of filters
        /*$('.first--and').on('click', function() {
            $('.first--group').show();
        });

        // TEMP: Hide the second group of filters
        $('.btn-remove-filter').on('click', function() {
            $(this).closest('.first--group').hide();
        });*/

    });

})(jQuery);

