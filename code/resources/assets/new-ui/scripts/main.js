(function($) {

    $(document).ready(function () {

        // Variables
        var $wrapper = $('.k-content-wrapper'),
            $sidebar = $('#k-sidebar'),
            $sidebaritem = $('.k-sidebar__item'),
            $content = $('.k-content'),
            $togglebutton = $('#k-toggle-button'),
            $fixedtable = $('.table--fixed'),
            $tableitems = $('tbody td'),
            $select2default = $('.select2--default'),
            $select2nogfx = $('.select2--no-gfx select'),
            $tree = $('.k-clicker'),
            $magnificframe = $('.mfp-iframe');


        // Offcanvasmenu
        if ( $sidebar.length && $togglebutton.length && $wrapper.length && $content.length ) {
            $sidebar.offCanvasMenu({
                menuToggle: $togglebutton,
                wrapper: $wrapper,
                container: $content
            });
        }


        // Sticky table header and footer
        if ( $fixedtable.length ) {
            $fixedtable.tableHeadFixer({'foot' : true, 'head' : true});
        }


        // Enable Select2 for all selectboxes within a select2 class container
        if ( $select2default.length ) {
            $select2default.select2();
        }

        // Enable Select2 for all selectboxes within a select2 class container
        if ( $select2nogfx.length ) {
            $select2nogfx.select2({
                minimumResultsForSearch: Infinity,
                allowClear: true
            });
        }


        // Table items
        if ( $tableitems.length ) {
            $tableitems.click(function () {
                var parent = $(this).parent();
                var checkbox = parent.find('input');
                parent.toggleClass(activeclass);
                if (checkbox.is(':checked')) {
                    checkbox.prop('checked', false);
                } else {
                    checkbox.prop('checked', true);
                }
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


        // Overflowing sidebar items
        if ( $sidebaritem.length ) {
            $sidebaritem.overflowing();
        }


        // Magnific popup
        if ( $magnificframe.length ) {
            $magnificframe.magnificPopup({
                type: 'iframe',
                mainClass: 'koowa_dialog_modal'
            });
        }

    });

})(jQuery);

