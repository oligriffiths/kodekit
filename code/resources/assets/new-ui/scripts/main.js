(function($) {

    $(document).ready(function () {

        // Variables
        var $wrapper = $('.k-overview'),
            $sidebar = $('#k-sidebar'),
            $sidebarright = $('#k-sidebar-right'),
            $sidebaritem = $('.k-sidebar__item'),
            $content = $('.k-content'),
            $togglebutton = $('#k-toggle-button'),
            $togglebuttonright = $('#k-toggle-button-right'),
            $fixedtable = $('.table--fixed'),
            $tableitems = $('tbody td'),
            $select2default = $('.select2--default'),
            $select2filter = $('.select2--filter select'),
            $tree = $('.k-clicker'),
            $magnificframe = $('.mfp-iframe'),
            $clickable = $('a, button');


        // Offcanvasmenu
        if ( $sidebar.length && $togglebutton.length && $wrapper.length && $content.length ) {
            $sidebar.offCanvasMenu({
                menuToggle: $togglebutton,
                wrapper: $wrapper,
                container: $content
            });
        }

        // Offcanvasmenu
        if ( $sidebarright.length && $togglebuttonright.length && $wrapper.length && $content.length ) {
            $sidebarright.offCanvasMenu({
                menuToggle: $togglebuttonright,
                wrapper: $wrapper,
                container: $content,
                position: 'right'
            });
        }


        // Sticky table header and footer
        if ( $fixedtable.length ) {
            $fixedtable.tableHeadFixer({'foot' : true, 'head' : true});
        }


        // Footable
        $('.footable').footable({
            breakpoints: {
                phone: 400,
                tablet: 600
            }
        });


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
            $select2filter.select2({
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



        $('.toggle-search').click(function() {
            $('.k-scopebar__search').slideToggle('fast');
        });


    });

})(jQuery);

