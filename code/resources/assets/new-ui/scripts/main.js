$(function() {

    // Offcanvasmenu
    new OffCanvasMenuController({
        $menu: $('#k-sidebar'),
        $menuToggle: $('#k-toggle-button')
    });

    // Sticky table header and footer
    $('.table--fixed').tableHeadFixer({'foot' : true, 'head' : true});


    // Enable Select2 for all selectboxes within a select2 class container
    var select2 = $('.select2');
    if ( select2 ) {
        select2.select2();
    }


    // Variables
    var koowa = $('#koowa'),
        sidebar = $('.k-sidebar'),
        component = $('.k-component'),
        toolbar = $('.k-toolbar'),
        togglebutton = $('.k-button--toggle'),
        tableitems = $('tbody td'),
        dragbar = $('.dragbar'),
        toggleclass = 'k-toggle',
        openedclass = 'k-opened',
        closedclass = 'k-closed',
        activeclass = 'k-active',
        zindex = koowa.css('z-index');


    // Table items
    tableitems.click(function() {
        var parent = $(this).parent();
        var checkbox = parent.find('input');
        parent.toggleClass(activeclass);
        if ( checkbox.is(':checked') ) {
            checkbox.prop('checked', false);
        } else {
            checkbox.prop('checked', true);
        }
    });


    // Clicking the parent item of the tree
    $('.k-tree > a').click(function(event) {
        event.preventDefault();
        zindex = koowa.css('z-index');
        toggleSidebar('tree', zindex);
    });


    // The tree
    $('.k-clicker').click(function(event) {
        event.stopPropagation();
        var element = $(this).parent();
        toggleTree(element);
    });


    $('.k-sidebar__item').overflowing();


    // Magnific popup
    $('.mfp-iframe').magnificPopup({
        type: 'iframe',
        mainClass: 'koowa_dialog_modal'
    });

    // When window gets resized
    $(window).on('resize', function() {
        var oldzindex = zindex;
        zindex = koowa.css('z-index');
        if ( zindex != oldzindex ) {
            toggleSidebar('resize', zindex);
        }
    });

});
