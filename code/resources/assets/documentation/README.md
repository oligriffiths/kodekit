Nooku Framework UI
==================

What is Nooku Framework UI
--------------------------

Nooku Framework UI is a collection of CSS (Sass) and JavaScript files to get a consistent UI across multiple platforms.

Dependencies
------------

Javascript:

* Modernizr
* jQuery
* Illusion
* Magnific popup
* Select2
* Twitter Bootstrap 3.x

CSS / Sass:

* Normalize
* Illusion
* Twitter Bootstrap

Bootstrap:

* normalize
* forms
* input-groups
* buttons

Misc:

* [Open Iconic](https://useiconic.com/open)

Features
--------

* Mobile-first
* Responsive
* Accessible
* Front & backend layouts
* Overview (list / grid) layout, form layout (front / back)
* Easily styleable by using Sass variables

Using icons
===========

The names of icons can be found on the Open Iconic site.

Use in markup
-------------

`<span class="k-icon-list"></span>` where list would be the name found on the Open Iconic site.

Use in SCSS
-----------

Check the `utilities/_koowa-icons.scss` file

Idiomatic CSS
-------------

We're using the Idiomatic CSS principles: https://github.com/necolas/idiomatic-css

We furthermore add the following for comments:

* All comments expect inline comments should have one line break after
* `Section comments` should be preceded by 3 line breaks unless it's on the top of the page
* `Sub-section comments` should be preceded by 2 line breaks unless it's on the top of the page
* `Short description & basic comments` should be preceded by 2 line breaks unless it's on the top of the page or preceded by another comment

**Sass**
 
Use sass-style inline comments (`//`) for everything that is sass only like variables, mixins, functions etc.