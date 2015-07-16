$(document).ready(function() {


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


    function openSidebar() {
        sidebar.removeClass(closedclass).addClass(openedclass);
        $('.collapsible').show();
    }

    function closeSidebar() {
        sidebar.addClass(closedclass).removeClass(openedclass);
        $('.collapsible').hide();
        $('.k-tree__items').hide();
    }

    function resetSidebar() {
        sidebar.removeClass(closedclass).removeClass(openedclass);
        $('.collapsible').show();
    }

    function openComponent() {
        component.removeClass(closedclass).addClass(openedclass);
    }

    function closeComponent() {
        component.addClass(closedclass).removeClass(openedclass);
    }

    function resetComponent() {
        component.removeClass(closedclass).removeClass(openedclass);
    }

    function toggleToolbar() {
        toolbar.addClass(toggleclass);
    }

    function resetToolbar() {
        toolbar.removeClass(toggleclass);
    }

    function toggleTree(element) {
        element.toggleClass('toggled').next('ul').toggleClass('opened').slideToggle('fast');
    }

    function toggleSidebar(setting, zindex) {
        if ( setting == 'resize' ) {
            if ( zindex == 0 ) {
                closeSidebar();
            } else {
                resetSidebar();
                resetComponent();
                resetToolbar();
            }
        }
        if ( setting == 'toggle' || setting == 'tree' ) {
            if ( zindex == 0 ) {
                if ( component.hasClass(closedclass) ) {
                    openComponent();
                    closeSidebar();
                } else {
                    closeComponent();
                    openSidebar();
                    if ( setting == 'tree' ) {
                        toggleTree( $('.k-tree > a') );
                    }
                }
            } else {
                if ( sidebar.hasClass(closedclass) ) {
                    resetSidebar();
                    resetComponent();
                    resetToolbar();
                    if ( setting == 'tree' ) {
                        toggleTree( $('.k-tree > a') );
                    }
                } else if ( setting != 'tree' ) {
                    closeSidebar();
                    toggleToolbar();
                }
            }
        }
    }

    // Clicking the main toggle button
    if ( togglebutton.length ) {
        togglebutton.click(function(event) {
            event.preventDefault();
            zindex = koowa.css('z-index');
            toggleSidebar('toggle', zindex);
        });
    }

    // Clicking the parent item of the tree
    $('.k-tree > a').click(function(event) {
        event.preventDefault();
        zindex = koowa.css('z-index');
        toggleSidebar('tree', zindex);
    });


    // When window gets resized
    $(window).on('resize', function() {
        var oldzindex = zindex;
        zindex = koowa.css('z-index');
        if ( zindex != oldzindex ) {
            toggleSidebar('resize', zindex);
        }
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


    // Repaint
    function repaint(element) {
        setTimeout(function() {
            element.hide(0).show(0);
        }, 100);
    }

    // Temp template switcher to test
    $(document).bind('keydown', function(e) {
        var csslink = $('link[href*="admin"]');
        var body = $('body');
        // 2
        if (e.which == 50) {
            csslink.attr('href', 'css/admin-default.css');
            repaint(body);
        }
        // 3
        if (e.which == 51) {
            csslink.attr('href', 'css/admin-other.css');
            repaint(body);
        }
        // 4
        if (e.which == 52) {
            csslink.attr('href', 'css/admin-joomla.css');
            repaint(body);
        }
        // 5
        if (e.which == 53) {
            csslink.attr('href', 'css/admin-wordpress.css');
            repaint(body);
        }
        // F
        if (e.which == 70) {
            $('.k-overview').toggleClass('k-flex');
            repaint(body);
        }
        // J
        if (e.which == 74) {
            koowa.toggleClass('js-enabled');
            repaint(body);
        }
    });

});