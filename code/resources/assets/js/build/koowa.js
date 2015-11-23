
var globalCacheForjQueryReplacement = window.jQuery;
window.jQuery = window.kQuery;
/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright	Copyright (C) 2015 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license		GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link		https://github.com/nooku/nooku-framework for the canonical source repository
 */

if(!Koowa) {
    /** @namespace */
    var Koowa = {};
}


/**
 * Polyfill for Function.prototype.bind, for older browsers that don't implement it natively
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

/*!
 * klass: a classical JS OOP façade
 * https://github.com/ded/klass
 * License MIT (c) Dustin Diaz & Jacob Thornton 2012
 */
var klass = (function () {
    var context = this
        , old = context.klass
        , f = 'function'
        , fnTest = /xyz/.test(function () {xyz}) ? /\bsupr\b/ : /.*/
        , proto = 'prototype';



    function klass(o) {
        return extend.call(isFn(o) ? o : function () {}, o, 1)
    }

    function isFn(o) {
        return typeof o === f
    }

    function wrap(k, fn, supr) {
        return function () {
            var tmp = this.supr;
            this.supr = supr[proto][k];
            var undef = {}.fabricatedUndefined;
            var ret = undef;
            try {
                ret = fn.apply(this, arguments)
            } finally {
                this.supr = tmp
            }
            return ret
        }
    }

    function process(what, o, supr) {
        for (var k in o) {
            if (o.hasOwnProperty(k)) {
                what[k] = isFn(o[k])
                && isFn(supr[proto][k])
                && fnTest.test(o[k])
                    ? wrap(k, o[k], supr) : o[k]
            }
        }
    }

    function extend(o, fromSub) {
        // must redefine noop each time so it doesn't inherit from previous arbitrary classes
        function noop() {}
        noop[proto] = this[proto];
        var supr = this
            , prototype = new noop()
            , isFunction = isFn(o)
            , _constructor = isFunction ? o : this
            , _methods = isFunction ? {} : o;
        function fn() {
            if (this.initialize) this.initialize.apply(this, arguments);
            else {
                fromSub || isFunction && supr.apply(this, arguments);
                _constructor.apply(this, arguments);
            }
        }

        fn.methods = function (o) {
            process(prototype, o, supr);
            fn[proto] = prototype;
            return this
        };

        fn.methods.call(fn, _methods).prototype.constructor = fn;

        fn.extend = arguments.callee;
        fn[proto].implement = fn.statics = function (o, optFn) {
            o = typeof o == 'string' ? (function () {
                var obj = {};
                obj[o] = optFn;
                return obj
            }()) : o;
            process(this, o, supr);
            return this
        };

        return fn
    }

    klass.noConflict = function () {
        context.klass = old;
        return this
    };

    return klass
})();

/** @class */
Koowa.Class = klass({

    /**
     * @memberOf Koowa.Class#
     */
    options: {},
    /**
     * @returns {object}
     */
    getOptions: function() {
        return {};
    },

    /**
     * @constructs Koowa.Class
     * */
    initialize: function() {
        this.setOptions(this.getOptions());
    },
    setOptions: function(options) {
        if (typeof options === 'object') {
            this.options = $.extend(true, {}, this.options, options);
        }

        return this;
    }
});

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
        this.boxes      = this.element.find(this.options.filter_selector);

        this.boxes.detach();

        var self = this;
        this.boxes.each(function(i, box) {
            var $box = $(box);

            self.filters[$box.attr('data-filter')] = {
                visible: false,
                label: $box.attr('data-label'),
                form_elements: $box.find(':input')
            };
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

            box.remove();
        });
    },
    buildSelectList: function(filter) {
        var select = $('<select />'),
            self = this;

        $.each(this.filters, function(key, filter) {
            if (!self.isVisible(key)) {
                select.append($('<option />', {'value': key, 'text': filter.label}));
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
            $.each(self.filters, function(key, filter) {
                if (!self.isVisible(key) && key !== selected && $.inArray(key, values) === -1) {
                    select.append($('<option />', {'value': key, 'text': filter.label}));
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
        return typeof this.filters[filter] === 'undefined' ? false : this.filters[filter].visible;
    },
    setVisible: function(filter) {
        if (typeof this.filters[filter] !== 'undefined') {
            this.filters[filter].visible = true;

            this.element.find('.k-filter-hidden').find('input[data-filter="'+filter+'"]').remove();
        }
    },
    setInvisible: function(filter) {
        if (typeof this.filters[filter] !== 'undefined') {
            this.filters[filter].visible = false;

            var form_els = this.filters[filter].form_elements,
                container = this.element.find('.k-filter-hidden');

            $.each(form_els, function(i, el) {
                $('<input type="hidden" />')
                    .attr('data-filter', filter)
                    .attr('name', $(el).attr('name'))
                    .val('')
                    .appendTo(container);
            });
        }
    },
    hasInvisible: function() {
        var result = false;

        $.each(this.filters, function(key, filter) {
            if (!result && !filter.visible) {
                result = true;
            }
        });

        return result;

        //return this.visible_filters.length < $.map(this.filters, function() { return 0}).length;
    }
});

})(window.kQuery);
/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright	Copyright (C) 2007 - 2014 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license		GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link		https://github.com/nooku/nooku-framework for the canonical source repository
 */

if(!Koowa) {
    /** @namespace */
    var Koowa = {};
}

(function($) {

$(function() {
    $('.submittable').on('click.koowa', function(event){
        event.preventDefault();

        new Koowa.Form($(event.target).data('config')).submit();
    });

    $('.-koowa-grid').each(function() {
        new Koowa.Controller.Grid({
            form: this
        });
    });

    $('.-koowa-form').each(function() {
        new Koowa.Controller.Form({
            form: this
        });
    });
});

if (!Koowa.Translator) {
    Koowa.Translator = Koowa.Class.extend({
        translations: {},
        translate: function(string, parameters) {
            if (typeof this.translations[string.toLowerCase()] !== 'undefined') {
                string = this.translations[string.toLowerCase()];
            }

            if (typeof parameters === 'object' && parameters !== null) {
                for (var key in parameters) {
                    if (parameters.hasOwnProperty(key)) {
                        // Escape for regular expression
                        var pattern = '{'+key+'}'.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

                        string  = string.replace(new RegExp(pattern, 'g'), parameters[key]);
                    }
                }
            }

            return string;
        },
        loadTranslations: function(object) {
            for (var string in object) {
                if (object.hasOwnProperty(string)) {
                    this.translations[string.toLowerCase()] = object[string];
                }
            }

            return this;
        }
    });

    Koowa.translator = new Koowa.Translator();
    Koowa.translate = Koowa.translator.translate.bind(Koowa.translator);
}

/**
 * Creates a 'virtual form'
 *
 * @param   {object} config Configuration object. Accepted keys: method, url, params, element
 * @example new KForm({url:'foo=bar&id=1', params:{field1:'val1', field2...}}).submit();
 * @extends Koowa.Class
 */
Koowa.Form = Koowa.Class.extend({
    initialize: function(config) {
        this.config = config;
        if(this.config.element) {
            this.form = $(document[this.config.element]);
        }
        else {
            this.form = $('<form/>', {
                name: 'dynamicform',
                method: this.config.method || 'POST',
                action: this.config.url
            });
            $(document.body).append(this.form);
        }
    },
    addField: function(name, value) {
        var elem = $('<input/>', {
            name: name,
            value: value,
            type: 'hidden'
        });
        elem.appendTo(this.form);

        return this;
    },

    submit: function() {
        var self = this;

        if (this.config.params) {
            $.each(this.config.params, function(name, value){
                self.addField(name, value);
            });
        }

        this.form.submit();
    }
});

/**
 * Controller class, execute actions complete with command chains
 */
Koowa.Controller = Koowa.Class.extend({
    form: null,
    toolbar: null,
    buttons: null,

    token_name: null,
    token_value: null,
    /**
     * @returns {object}
     */
    getOptions: function() {
        return $.extend(this.supr(), {
            toolbar: '.k-toolbar',
            url: window.location.href
        });
    },
    initialize: function(options){
        var self = this;

        this.supr();
        this.setOptions(options);

        this.form = $(this.options.form);

        this.setOptions(this.form.data());

        if (this.form.prop('action')) {
            this.options.url = this.form.attr('action');
        }

        this.toolbar = $(this.options.toolbar);
        this.form.data('controller', this);

        this.on('execute', function(){
            return self.execute.apply(self, arguments);
        });

        this.token_name = this.form.data('token-name');
        this.token_value = this.form.data('token-value');

        if(this.toolbar) {
            this.setToolbar();
        }
    },
    setToolbar: function() {
        var self = this;

        this.buttons = this.toolbar.find('.toolbar[data-action]');

        this.buttons.each(function() {
            var button = $(this),
                context = {},
                options = button.data(),
                data = options.data;

            if (options.eventAdded) {
                return;
            }

            if (typeof data !== 'object') {
                data = (data && $.type(data) === 'string') ? $.parseJSON(data) : {};
            }

            //Set token data
            if (self.token_name) {
                data[self.token_name] = self.token_value;
            }

            context.validate = options.novalidate !== 'novalidate';
            context.data   = data;
            context.action = options.action;

            button.on('click.koowa', function(event) {
                event.preventDefault();

                context.trigger = button;

                if (!button.hasClass('disabled')) {
                    var prompt = button.data('prompt');

                    if (prompt && !confirm(prompt)) {
                        return;
                    }

                    self.setOptions(options);
                    self.trigger('execute', [context]);
                }
            });

            button.data('event-added', true);
        });
    },
    execute: function(event, context){
        if (context.action[0]) {
            var action   = context.action[0].toUpperCase() + context.action.substr(1),
                method = '_action' + action;

            if (typeof context.validate === 'undefined') {
                context.validate = true;
            }

            if (this.trigger('before'+action, context)) {
                method = this[method] ? method : '_actionDefault';

                this[method].call(this, context);

                this.trigger('after'+action, context);
            }
        }

        return this;
    },
    on: function(type, fn){
        return this.form.on('koowa:'+type, fn);
    },

    off: function(type, fn){
        return this.form.off('koowa:'+type, fn);
    },

    trigger: function(type, args){
        var event = $.Event('koowa:'+type);
        this.form.trigger(event, args);
        return !event.isDefaultPrevented();
    },

    checkValidity: function(){
        var buttons;

        if (this.buttons) {
            this.trigger('beforeValidate');

            buttons = this.buttons.filter('[data-novalidate!="novalidate"]');

            if (this.trigger('validate')) {
                buttons.removeClass('disabled');
            } else {
                buttons.addClass('disabled');
            }

            this.trigger('afterValidate');
        }
    }
});

/**
 * Controller class specialized for grids, extends Koowa.Controller
 *
 * @package     Koowa_Media
 * @subpackage  Javascript
 */
Koowa.Controller.Grid = Koowa.Controller.extend({
    getOptions: function() {
        return $.extend(this.supr(), {
            inputs: '.-koowa-grid-checkbox, .-koowa-grid-checkall',
            ajaxify: false
        });
    },
    initialize: function(options){
        var thead,
            self = this;

        this.supr(options);

        this.grid = new Koowa.Grid(this.form);

        this.on('validate', this.validate);

        if (this.options.inputs && this.buttons) {
            this.checkValidity();
            this.form.find(this.options.inputs).on('change.koowa', function(event, ignore){
                if (!ignore) {
                    self.checkValidity();
                }
            });
        }

        this.token_name = this.form.data('token-name');
        this.token_value = this.form.data('token-value');

        this.setTableHeaders();
        this.setTableRows();
        this.setFilters();

        // <select> elements in headers and footers are for filters, so they need to submit the form on change
        this.form.find('thead select, tfoot select, .k-pagination select').on('change.koowa', function(){
            // We need to uncheck rows here otherwise only selected rows will be visible after submitting the form
            self.grid.uncheckAll();

            if (self.options.ajaxify) {
                event.preventDefault();

                self.options.transport(self.options.url, self.form.serialize(), 'get');
            }

            self.form.submit();
        });

    },

    setFilters: function() {
        new Koowa.Grid.Filter(this.form.find('.k-filter-container'));
    },

    setTableHeaders: function() {
        //Make the table headers "clickable"
        this.form.find('thead tr > *').each(function() {
            var element = $(this),
                link = element.find('a'),
                checkall = element.find('.-koowa-grid-checkall');

            if (link.length) {
                element.on('click.koowa', function(event){
                    //Don't do anything if the event target is the same as the element
                    if(event.target != element[0]) {
                        return;
                    }

                    //Run this check on click, so that progressive enhancements isn't bulldozed
                    if(link.prop('href')) {
                        window.location.href = link.prop('href');
                    } else {
                        link.trigger('click', event);
                    }
                });

                if(link.hasClass('-koowa-asc')) {
                    element.addClass('-koowa-asc');
                } else if(link.hasClass('-koowa-desc')) {
                    element.addClass('-koowa-desc');
                }

                return this;
            } else if(checkall.length) {
                //Making the <td> or <th> element that's the parent of a checkall checkbox toggle the checkbox when clicked
                element.on('click.koowa', function(event){
                    //Don't do anything if the event target is the same as the element
                    if(event.target != element[0]) {
                        return true;
                    }

                    //Checkall uses change for other purposes
                    checkall.prop('checked', checkall.is(':checked') ? false : true).trigger('change');
                });
            }

            element.addClass('void');
        });
    },
    setTableRows: function() {
        var self = this,
            checkboxes = this.form.find('tbody tr .-koowa-grid-checkbox');

        this.form.find('tbody tr').each(function(){
            var tr = $(this),
                checkbox = tr.find('.-koowa-grid-checkbox');

            if(tr.data('readonly') == true || !checkbox.length) {
                return;
            }

            // Trigger checkbox when the user clicks anywhere in the row
            tr.on('click.koowa', function(event){
                var target = $(event.target);
                if(target.is('[type=radio], [type=checkbox], a[href], span.footable-toggle')) {
                    return;
                }

                checkbox.prop('checked', !checkbox.prop('checked')).trigger('change');
            });

            // Checkbox should add selected and selected-multiple classes to the row
            checkbox.on('change.koowa', function(){
                var selected,
                    parent = tr.parent();

                if ($(this).is('[type=radio]')) {
                    parent.find('.selected').removeClass('selected');
                }

                $(this).prop('checked') ? tr.addClass('selected') : tr.removeClass('selected');

                selected = tr.hasClass('selected') + tr.siblings('.selected').length;

                if(selected > 1) {
                    parent.addClass('selected-multiple').removeClass('selected-single')
                } else {
                    parent.removeClass('selected-multiple').addClass('selected-single');
                }
            }).trigger('change', true);

            // Set up buttons such as publish/unpublish triggers
            tr.find('[data-action]').each(function() {
                var action = $(this),
                    context = {},
                    data = action.data('data'),
                    options = action.data(),
                    eventType = action.data('event-type');

                if (typeof data !== 'object') {
                    data = (data && $.type(data) === 'string') ? $.parseJSON(data) : {};
                }

                //Set token data
                if(self.token_name) {
                    data[self.token_name] = self.token_value;
                }

                if(!eventType) {
                    eventType = action.is('[type="radio"],[type="checkbox"],select') ? 'change' : 'click';
                }

                context.validate = options.novalidate !== 'novalidate';
                context.data   = data;
                context.action = options.action;

                action.on(eventType+'.koowa', function(){
                    checkboxes.prop('checked', '');
                    checkbox.prop('checked', 'checked');
                    checkboxes.trigger('change', true);

                    context.trigger = action;

                    self.setOptions(options);
                    self.trigger('execute', [context]);
                });
            });
        });
    },
    validate: function(){
        return Koowa.Grid.getIdQuery() || false;
    },

    _actionDelete: function(context) {
        context.method = 'delete';

        return this._actionDefault(context);
    },

    _actionDefault: function(context) {
        var idQuery = Koowa.Grid.getIdQuery(),
            append  = this.options.url.match(/\?/) ? '&' : '?',
            options;

        if (context.validate && !this.trigger('validate', [context])) {
            return false;
        }

        options = {
            method:'post',
            url: this.options.url+(idQuery ? append+idQuery : ''),
            params: $.extend({}, {_action: context.action}, context.data)
        };

        if (context.method) {
            options.params._method = context.method;
        }

        new Koowa.Form(options).submit();
    }
});

/**
 * Controller class specialized for forms, extends Koowa.Controller
 */
Koowa.Controller.Form = Koowa.Controller.extend({
    _actionDefault: function(context){
        if (context.validate && !this.trigger('validate', [context])) {
            return false;
        }

        this.form.append($('<input/>', {name: '_action', type: 'hidden', value: context.action}));

        this.trigger('submit', [context]);
        this.form.submit();
    }

});

})(window.kQuery);


window.jQuery = globalCacheForjQueryReplacement;
globalCacheForjQueryReplacement = undefined;