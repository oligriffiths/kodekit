var globalCacheForjQueryReplacement=window.jQuery;/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright	Copyright (C) 2015 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license		GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link		https://github.com/nooku/nooku-framework for the canonical source repository
 */
if(window.jQuery=window.kQuery,!Koowa)var Koowa={};Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e});/*!
 * klass: a classical JS OOP façade
 * https://github.com/ded/klass
 * License MIT (c) Dustin Diaz & Jacob Thornton 2012
 */
var klass=function(){function a(a){return e.call(b(a)?a:function(){},a,1)}function b(a){return typeof a===h}function c(a,b,c){return function(){var d=this.supr;this.supr=c[j][a];var e={}.fabricatedUndefined,f=e;try{f=b.apply(this,arguments)}finally{this.supr=d}return f}}function d(a,d,e){for(var f in d)d.hasOwnProperty(f)&&(a[f]=b(d[f])&&b(e[j][f])&&i.test(d[f])?c(f,d[f],e):d[f])}function e(a,c){function e(){}function f(){this.initialize?this.initialize.apply(this,arguments):(c||i&&g.apply(this,arguments),k.apply(this,arguments))}e[j]=this[j];var g=this,h=new e,i=b(a),k=i?a:this,l=i?{}:a;return f.methods=function(a){return d(h,a,g),f[j]=h,this},f.methods.call(f,l).prototype.constructor=f,f.extend=arguments.callee,f[j].implement=f.statics=function(a,b){return a="string"==typeof a?function(){var c={};return c[a]=b,c}():a,d(this,a,g),this},f}var f=this,g=f.klass,h="function",i=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,j="prototype";return a.noConflict=function(){return f.klass=g,this},a}();/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright	Copyright (C) 2007 - 2014 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license		GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link		https://github.com/nooku/nooku-framework for the canonical source repository
 */
if(function(a){Koowa.Class=klass({options:{},getOptions:function(){return{}},initialize:function(){this.setOptions(this.getOptions())},setOptions:function(b){return"object"==typeof b&&(this.options=a.extend(!0,{},this.options,b)),this}})}(window.kQuery),/**
 * Nooku Framework - http://nooku.org/framework
 *
 * @copyright	Copyright (C) 2015 Johan Janssens and Timble CVBA. (http://www.timble.net)
 * @license		GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link		https://github.com/nooku/nooku-framework for the canonical source repository
 */
"undefined"==typeof Koowa&&(Koowa={}),function(a){Koowa.Grid=Koowa.Class.extend({initialize:function(b){var c=this;this.element=a(b),this.form=this.element.is("form")?this.element:this.element.closest("form"),this.toggles=this.element.find(".-koowa-grid-checkall"),this.checkboxes=this.element.find(".-koowa-grid-checkbox").filter(function(b,c){return!a(c).prop("disabled")}),this.checkboxes.length||this.toggles.prop("disabled",!0),this.toggles.on("change.koowa",function(b,d){d||c.checkAll(a(this).prop("checked"))}),this.checkboxes.on("change.koowa",function(a,b){b||c.setCheckAll()})},checkAll:function(b){var c=this.checkboxes.filter(function(c,d){return a(d).prop("checked")!==b});this.checkboxes.prop("checked",b),c.trigger("change",!0)},uncheckAll:function(){this.checkAll(!1)},setCheckAll:function(){var b=this.checkboxes.filter(function(b,c){return a(c).prop("checked")!==!1}).length;this.toggles.prop("checked",this.checkboxes.length===b),this.toggles.trigger("change",!0)}}),Koowa.Grid.getAllSelected=function(b){return a(".-koowa-grid-checkbox:checked",b)},Koowa.Grid.getIdQuery=function(a){return decodeURIComponent(this.getAllSelected(a).serialize())},Koowa.Grid.Filter=Koowa.Class.extend({element:null,boxes:null,add_button:null,filter_button:null,filter_prototype:null,filters:{},getOptions:function(){return a.extend(!0,this.supr(),{prototype_selector:".js-filter-group--prototype",filter_selector:".k-filter-container__item",add_selector:".js-add-button",remove_selector:".js-remove-filter",filter_button_selector:".js-filter-button",and_selector:".k-filter--text--and",filter_container:".js-filter-container"})},initialize:function(b,c){this.setOptions(c),this.supr(),this.element=a(b),this.filter_prototype=this.element.find(this.options.prototype_selector),this.add_button=this.element.find(this.options.add_selector),this.boxes=this.element.find(this.options.filter_selector),this.filter_button=this.element.find(this.options.filter_button_selector),this.filter_container=this.element.find(this.options.filter_container),this.boxes.detach();var d=this;this.boxes.each(function(b,c){var e=a(c);d.filters[e.attr("data-filter")]={visible:!1,label:e.attr("data-label"),form_elements:e.find(":input")}}).each(function(b,c){var e=a(c);("true"===a(c).attr("data-active")||a(c).find("select").val())&&d.showFilter(e.attr("data-filter"))}),this.hasVisible()||this.filter_button.hide(),this.addEvents()},addEvents:function(){var b=this;this.add_button.click(function(a){a.preventDefault(),b.showFirstFilter()}),this.element.on("click",this.options.remove_selector,function(c){c.preventDefault();var d=a(c.target).parents(".k-filter-group"),e=d.data("filter");b.setInvisible(e),b.updateSelectBoxes(),b.updateButtons(),d.remove()})},buildSelectList:function(b){var c=a("<select />"),d=this;return a.each(this.filters,function(b,e){d.isVisible(b)||c.append(a("<option />",{value:b,text:e.label}))}),c.addClass("select2-filter--no-search js-filter-select"),c.data("selected",b),c.val(b),c.change(function(){var b=c.data("selected"),e=a(this).val(),f=a(this).parents(".k-filter-group").find(".k-filter--container");f.empty().append(d.boxes.filter('[data-filter="'+e+'"]')),c.data("selected",e),b&&d.setInvisible(b),c.parents(".k-filter-group").data("filter",e),d.setVisible(e),d.updateSelectBoxes()}),c},updateSelectBoxes:function(){var b=this;this.element.find(".js-filter-select").each(function(c,d){var e=a(d),f=e.val(),g=[];e.find("option").each(function(c,d){var e=a(d),h=e.val();h!==f&&b.isVisible(h)?e.remove():g.push(h)}),a.each(b.filters,function(c,d){b.isVisible(c)||c===f||-1!==a.inArray(c,g)||e.append(a("<option />",{value:c,text:d.label}))})})},showFilter:function(a){var b=this.filter_prototype.clone(!0);return b.find(".k-filter--select").append(this.buildSelectList(a)),b.find(".k-filter--container").append(this.boxes.filter('[data-filter="'+a+'"]')),b.removeClass("k-filter-group--prototype").css("display","").data("filter",a).insertBefore(this.element.find(".js-placeholder")),this.setVisible(a),this.updateSelectBoxes(),this.updateButtons(),b.find(".js-filter-select").select2({minimumResultsForSearch:-1,theme:"tiny"}),b},showFirstFilter:function(){var b=null,c=this;return a.each(this.filters,function(a){b||c.isVisible(a)||(b=a)}),b&&(b=c.showFilter(b)),b},updateButtons:function(){this.element.find(this.options.and_selector).css("display","").eq(1).css("display","none"),this.add_button.attr("disabled",this.hasInvisible()?!1:!0),this.filter_button.show()},isVisible:function(a){return"undefined"==typeof this.filters[a]?!1:this.filters[a].visible},setVisible:function(a){"undefined"!=typeof this.filters[a]&&(this.filters[a].visible=!0,this.filter_container.find('input[data-filter="'+a+'"]').remove())},setInvisible:function(b){if("undefined"!=typeof this.filters[b]){this.filters[b].visible=!1;var c=this.filters[b].form_elements,d=this.filter_container;a.each(c,function(c,e){a('<input type="hidden" />').attr("data-filter",b).attr("name",a(e).attr("name")).val("").appendTo(d)})}},hasVisible:function(){var b=!1;return a.each(this.filters,function(a,c){!b&&c.visible&&(b=!0)}),b},hasInvisible:function(){var b=!1;return a.each(this.filters,function(a,c){b||c.visible||(b=!0)}),b}})}(window.kQuery),!Koowa)var Koowa={};!function(a){a(function(){a(".submittable").on("click.koowa",function(b){b.preventDefault(),new Koowa.Form(a(b.target).data("config")).submit()}),a(".-koowa-grid").each(function(){new Koowa.Controller.Grid({form:this})}),a(".-koowa-form").each(function(){new Koowa.Controller.Form({form:this})})}),Koowa.Translator||(Koowa.Translator=Koowa.Class.extend({translations:{},translate:function(a,b){if("undefined"!=typeof this.translations[a.toLowerCase()]&&(a=this.translations[a.toLowerCase()]),"object"==typeof b&&null!==b)for(var c in b)if(b.hasOwnProperty(c)){var d="{"+c+"}".replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");a=a.replace(new RegExp(d,"g"),b[c])}return a},loadTranslations:function(a){for(var b in a)a.hasOwnProperty(b)&&(this.translations[b.toLowerCase()]=a[b]);return this}}),Koowa.translator=new Koowa.Translator,Koowa.translate=Koowa.translator.translate.bind(Koowa.translator)),Koowa.Form=Koowa.Class.extend({initialize:function(b){this.config=b,this.config.element?this.form=a(document[this.config.element]):(this.form=a("<form/>",{name:"dynamicform",method:this.config.method||"POST",action:this.config.url}),a(document.body).append(this.form))},addField:function(b,c){var d=a("<input/>",{name:b,value:c,type:"hidden"});return d.appendTo(this.form),this},submit:function(){var b=this;this.config.params&&a.each(this.config.params,function(a,c){b.addField(a,c)}),this.form.submit()}}),Koowa.Controller=Koowa.Class.extend({form:null,toolbar:null,buttons:null,token_name:null,token_value:null,getOptions:function(){return a.extend(this.supr(),{toolbar:".k-toolbar",url:window.location.href})},initialize:function(b){var c=this;this.supr(),this.setOptions(b),this.form=a(this.options.form),this.setOptions(this.form.data()),this.form.prop("action")&&(this.options.url=this.form.attr("action")),this.toolbar=a(this.options.toolbar),this.form.data("controller",this),this.on("execute",function(){return c.execute.apply(c,arguments)}),this.token_name=this.form.data("token-name"),this.token_value=this.form.data("token-value"),this.toolbar&&this.setToolbar()},setToolbar:function(){var b=this;this.buttons=this.toolbar.find(".toolbar[data-action]"),this.buttons.each(function(){var c=a(this),d={},e=c.data(),f=e.data;e.eventAdded||("object"!=typeof f&&(f=f&&"string"===a.type(f)?a.parseJSON(f):{}),b.token_name&&(f[b.token_name]=b.token_value),d.validate="novalidate"!==e.novalidate,d.data=f,d.action=e.action,c.on("click.koowa",function(a){if(a.preventDefault(),d.trigger=c,!c.hasClass("disabled")){var f=c.data("prompt");if(f&&!confirm(f))return;b.setOptions(e),b.trigger("execute",[d])}}),c.data("event-added",!0))})},execute:function(a,b){if(b.action[0]){var c=b.action[0].toUpperCase()+b.action.substr(1),d="_action"+c;"undefined"==typeof b.validate&&(b.validate=!0),this.trigger("before"+c,b)&&(d=this[d]?d:"_actionDefault",this[d].call(this,b),this.trigger("after"+c,b))}return this},on:function(a,b){return this.form.on("koowa:"+a,b)},off:function(a,b){return this.form.off("koowa:"+a,b)},trigger:function(b,c){var d=a.Event("koowa:"+b);return this.form.trigger(d,c),!d.isDefaultPrevented()},checkValidity:function(){var a;this.buttons&&(this.trigger("beforeValidate"),a=this.buttons.filter('[data-novalidate!="novalidate"]'),this.trigger("validate")?a.removeClass("disabled"):a.addClass("disabled"),this.trigger("afterValidate"))}}),Koowa.Controller.Grid=Koowa.Controller.extend({getOptions:function(){return a.extend(this.supr(),{inputs:".-koowa-grid-checkbox, .-koowa-grid-checkall",ajaxify:!1})},initialize:function(a){var b=this;this.supr(a),this.grid=new Koowa.Grid(this.form),this.on("validate",this.validate),this.options.inputs&&this.buttons&&(this.checkValidity(),this.form.find(this.options.inputs).on("change.koowa",function(a,c){c||b.checkValidity()})),this.token_name=this.form.data("token-name"),this.token_value=this.form.data("token-value"),this.setTableHeaders(),this.setTableRows(),this.setFilters(),this.form.find("thead select, tfoot select, .k-pagination select").on("change.koowa",function(){b.grid.uncheckAll(),b.options.ajaxify&&(event.preventDefault(),b.options.transport(b.options.url,b.form.serialize(),"get")),b.form.submit()})},setFilters:function(){new Koowa.Grid.Filter(this.form.find(".k-filter-container"))},setTableHeaders:function(){this.form.find("thead tr > *").each(function(){var b=a(this),c=b.find("a"),d=b.find(".-koowa-grid-checkall");return c.length?(b.on("click.koowa",function(a){a.target==b[0]&&(c.prop("href")?window.location.href=c.prop("href"):c.trigger("click",a))}),c.hasClass("-koowa-asc")?b.addClass("-koowa-asc"):c.hasClass("-koowa-desc")&&b.addClass("-koowa-desc"),this):(d.length&&b.on("click.koowa",function(a){return a.target!=b[0]?!0:void d.prop("checked",d.is(":checked")?!1:!0).trigger("change")}),void b.addClass("void"))})},setTableRows:function(){var b=this,c=this.form.find("tbody tr .-koowa-grid-checkbox");this.form.find("tbody tr").each(function(){var d=a(this),e=d.find(".-koowa-grid-checkbox");1!=d.data("readonly")&&e.length&&(d.on("click.koowa",function(b){var c=a(b.target);c.is("[type=radio], [type=checkbox], a[href], span.footable-toggle")||e.prop("checked",!e.prop("checked")).trigger("change")}),e.on("change.koowa",function(){var b,c=d.parent();a(this).is("[type=radio]")&&c.find(".selected").removeClass("selected"),a(this).prop("checked")?d.addClass("selected"):d.removeClass("selected"),b=d.hasClass("selected")+d.siblings(".selected").length,b>1?c.addClass("selected-multiple").removeClass("selected-single"):c.removeClass("selected-multiple").addClass("selected-single")}).trigger("change",!0),d.find("[data-action]").each(function(){var d=a(this),f={},g=d.data("data"),h=d.data(),i=d.data("event-type");"object"!=typeof g&&(g=g&&"string"===a.type(g)?a.parseJSON(g):{}),b.token_name&&(g[b.token_name]=b.token_value),i||(i=d.is('[type="radio"],[type="checkbox"],select')?"change":"click"),f.validate="novalidate"!==h.novalidate,f.data=g,f.action=h.action,d.on(i+".koowa",function(){c.prop("checked",""),e.prop("checked","checked"),c.trigger("change",!0),f.trigger=d,b.setOptions(h),b.trigger("execute",[f])})}))})},validate:function(){return Koowa.Grid.getIdQuery()||!1},_actionDelete:function(a){return a.method="delete",this._actionDefault(a)},_actionDefault:function(b){var c,d=Koowa.Grid.getIdQuery(),e=this.options.url.match(/\?/)?"&":"?";return b.validate&&!this.trigger("validate",[b])?!1:(c={method:"post",url:this.options.url+(d?e+d:""),params:a.extend({},{_action:b.action},b.data)},b.method&&(c.params._method=b.method),void new Koowa.Form(c).submit())}}),Koowa.Controller.Form=Koowa.Controller.extend({_actionDefault:function(b){return b.validate&&!this.trigger("validate",[b])?!1:(this.form.append(a("<input/>",{name:"_action",type:"hidden",value:b.action})),this.trigger("submit",[b]),void this.form.submit())}})}(window.kQuery),window.jQuery=globalCacheForjQueryReplacement,globalCacheForjQueryReplacement=void 0;
//# sourceMappingURL=koowa.js.map