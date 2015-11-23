/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright	Copyright (C) 2015 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license		GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link		https://github.com/nooku/nooku-framework for the canonical source repository
 */

if (typeof Koowa === 'undefined') {
    Koowa = {};
}


(function($){
/**
 * Grid class
 */
Koowa.Grid = Koowa.Class.extend({
    initialize: function(element){
        var self = this;

        this.element    = $(element);
        this.form       = this.element.is('form') ? this.element : this.element.closest('form');
        this.toggles    = this.element.find('.-koowa-grid-checkall');
        this.checkboxes = this.element.find('.-koowa-grid-checkbox').filter(function(i, checkbox) {
            return !$(checkbox).prop('disabled');
        });

        if(!this.checkboxes.length) {
            this.toggles.prop('disabled', true);
        }

        this.toggles.on('change.koowa', function(event, ignore){
            if(!ignore) {
                self.checkAll($(this).prop('checked'));
            }
        });

        this.checkboxes.on('change.koowa', function(event, ignore){
            if(!ignore) {
                self.setCheckAll();
            }
        });
    },
    checkAll: function(value){
        var changed = this.checkboxes.filter(function(i, checkbox){
            return $(checkbox).prop('checked') !== value;
        });

        this.checkboxes.prop('checked', value);
        changed.trigger('change', true);
    },
    uncheckAll: function() {
        this.checkAll(false);
    },
    setCheckAll: function(){
        var total = this.checkboxes.filter(function(i, checkbox){
            return $(checkbox).prop('checked') !== false;
        }).length;

        this.toggles.prop('checked', this.checkboxes.length === total);
        this.toggles.trigger('change', true);
    }
});

/**
 * Find all selected checkboxes' ids in the grid
 *
 * @param   {string|object|null} [context]   A DOM Element, Document, or jQuery to use as context
 * @return  array           The items' ids
 */
Koowa.Grid.getAllSelected = function(context) {
    return $('.-koowa-grid-checkbox:checked', context);
};

/**
 * Get a query string for selected checkboxes
 *
 * @param   {string|object|null} [context]   A DOM Element, Document, or jQuery to use as context
 * @return  array           The items' ids
 */
Koowa.Grid.getIdQuery = function(context) {
    return decodeURIComponent(this.getAllSelected(context).serialize());
};

Koowa.Grid.Filter = Koowa.Class.extend({
    element: null,

    boxes: null,
    add_button: null,
    filter_prototype: null,

    filters: {},
    visible_filters: [],
    /**
     * @returns {object}
     */
    getOptions: function() {
        return $.extend(true, this.supr(), {
            prototype_selector: '.k-filter-group--prototype',
            filter_selector:    '.k-filter-container__item',
            add_selector:       '.js-add-button',
            remove_selector:    '.btn-remove-filter',
            and_selector:       '.k-filter--text--and'
        });
    },
    initialize: function(element, options) {
        this.setOptions(options);
        this.supr();

        this.element    = $(element);
        this.filter_prototype  = this.element.find(this.options.prototype_selector);
        this.add_button = this.element.find(this.options.add_selector);
        this.boxes      = this.element.find(this.options.filter_selector).detach();

        var self = this;
        this.boxes.each(function(i, box) {
            var $box = $(box);
            self.filters[$box.attr('data-filter')] = $box.attr('data-label');
        }).each(function(i, box) {
            var $box = $(box);
            if($(box).attr('data-active') === 'true' || $(box).find('select').val()) {
                self.showFilter($box.attr('data-filter'));
            }
        });

        this.addEvents();
    },
    addEvents: function() {
        var self = this;

        this.add_button.click(function(event) {
            event.preventDefault();

            self.showFirstFilter();
        });

        this.element.on('click', this.options.remove_selector, function(event) {
            event.preventDefault();

            var box = $(event.target).parents('.k-filter-group'),
                filter = box.data('filter');

            self.setInvisible(filter);
            self.updateSelectBoxes();
            self.updateAddButton();

            //self.element('.k-filter-hidden').append(box);
            box.remove();
        });
    },
    buildSelectList: function(filter) {
        var select = $('<select />'),
            self = this;

        $.each(this.filters, function(key, label) {
            if (!self.isVisible(key)) {
                select.append($('<option />', {'value': key, 'text': label}));
            }
        });

        select.addClass('select2-filter--no-search js-filter-select');

        select.data('selected', filter);
        select.val(filter);

        select.change(function() {
            var old_value = select.data('selected');
            var new_value = $(this).val();
            var container = $(this).parents('.k-filter-group').find('.k-filter--container');

            container.empty().append(self.boxes.filter('[data-filter="'+new_value+'"]'));

            select.data('selected', new_value);

            if (old_value) {
                self.setInvisible(old_value);
            }

            select.parents('.k-filter-group').data('filter', new_value);
            self.setVisible(new_value);

            self.updateSelectBoxes();
        });

        return select;
    },
    updateSelectBoxes: function() {
        var self = this;

        this.element.find('.js-filter-select').each(function(i, element) {
            var select = $(element),
                selected = select.val(),
                values   = [];

            // remove extras
            select.find('option').each(function(i, option) {
                var $option = $(option),
                    value   = $option.val();

                if (value !== selected && self.isVisible(value)) {
                    $option.remove();
                } else {
                    values.push(value);
                }
            });

            // add missing
            $.each(self.filters, function(key, label) {
                if (!self.isVisible(key) && key !== selected && $.inArray(key, values) === -1) {
                    select.append($('<option />', {'value': key, 'text': label}));
                }
            });
        });
    },
    showFilter: function(filter) {
        var box = this.filter_prototype.clone(true);

        box.find('.k-filter--select').append(this.buildSelectList(filter));
        box.find('.k-filter--container').append(this.boxes.filter('[data-filter="'+filter+'"]'));

        box.removeClass('k-filter-group--prototype').css('display', '')
            .data('filter', filter)
            .insertBefore(this.element.find('.js-placeholder'));

        this.setVisible(filter);

        this.updateSelectBoxes();
        this.updateAddButton();

        box.find('.js-filter-select').select2({
            minimumResultsForSearch: -1,
            theme: "tiny"
        });

        return box;
    },
    showFirstFilter: function() {
        var filter = null,
            self = this;
        $.each(this.filters, function(key) {
            if (!filter && !self.isVisible(key)) {
                filter = key;
            }
        });

        if (filter) {
            filter = self.showFilter(filter);
        }

        return filter;
    },
    updateAddButton: function() {
        // first one is the protoype, hide the second, display the rest
        this.element.find(this.options.and_selector).css('display', '').eq(1).css('display', 'none');

        this.add_button.attr('disabled', this.hasInvisible() ? false : true);
    },
    isVisible: function(filter) {
        return $.inArray(filter, this.visible_filters) !== -1;
    },
    setVisible: function(filter) {
        if (!this.isVisible(filter)) {
            this.visible_filters.push(filter);
        }
    },
    setInvisible: function(filter) {
        if (this.isVisible(filter)) {
            for (var i = this.visible_filters.length-1; i >= 0; i--) {
                if (this.visible_filters[i] === filter) {
                    this.visible_filters.splice(i, 1);
                }
            }
        }
    },
    hasInvisible: function() {
        return this.visible_filters.length < $.map(this.filters, function() { return 0}).length;
    }
});

})(window.kQuery);