<?php include '_header.php'; ?>

    <!-- Overview layout -->
    <div class="k-overview">

        <!-- Titlebar -->
        <div class="k-titlebar">

            <!-- Sidebar toggle button -->
            <button id="k-toggle-button" class="off-canvas-menu-toggle" type="button">
                <span class="bar1"></span>
                <span class="bar2"></span>
                <span class="bar3"></span>
            </button>

            <!-- Title -->
            <h2 style="float: left;">Insert / Upload file</h2>

            <!-- Right sidebar toggle button -->
            <button id="k-toggle-button-right" class="off-canvas-menu-toggle" type="button" style="float: right;">
                <span class="bar1"></span>
                <span class="bar2"></span>
                <span class="bar3"></span>
            </button>

        </div><!-- .k-titlebar -->

        <!-- Form -->
        <form id="k-offcanvas-container" class="k-content-wrapper">

            <!-- Sidebar -->
            <div id="k-sidebar" class="k-sidebar">

                <!-- Categories -->
                <div class="k-sidebar__item">
                    <div class="k-sidebar__content">

                        <ul class="k-list">
                            <li class="k-tree">
                                <a href="#">
                                    <span class="k-clicker"></span>
                                    <span class="k-icon-folder"></span>
                                    <span class="k-title">Home</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div><!-- .k-sidebar -->

            <!-- Content -->
            <div class="k-content">

                <!-- Component -->
                <div class="k-component">

                    <!-- Breadcrumbs -->
                    <div class="k-breadcrumb">
                        <ul>
                            <li class="home">
                                <a class="k-breadcrumb__item k-icon-home" href="#">
                                    <span class="visually-hidden">Home</span>
                                </a>
                            </li>
                            <li>
                                <a class="k-breadcrumb__item" href="#">
                                    Some category
                                </a>
                            </li>
                            <li class="active">
                                <span class="k-breadcrumb__item">Some other category</span>
                            </li>
                        </ul>
                    </div>

                    <!-- upload -->
                    <div class="k-upload">
                        <div class="drop-message">
                            Drop files here <small style="font-size: 14px;padding-left: 5px;">(max 10MB)</small>
                        </div>
                        <div class="select-message">
                            <button class="btn btn-sm btn-primary">Select</button>
                            <button class="btn btn-sm btn-primary">From URL</button>
                        </div>
                    </div><!-- .k-upload -->

                    <!-- Scopebar -->
                    <div class="k-scopebar">

                        <!-- Filters -->
                        <div class="k-scopebar__item k-scopebar__item--fluid">
                            
                            <!-- Filter -->
                            <div class="select2-wrapper select2--link-style select2--filter">
                                <select name="enabled" id="select2-filter" data-placeholder="Status">
                                    <option></option>
                                    <option value="1">Published</option>
                                    <option value="0">Unpublished</option>
                                </select>
                            </div>

                            <!-- Search toggle button -->
                            <button type="button" class="toggle-search">Search</button>
                            
                        </div>

                        <!-- Search -->
                        <div class="k-scopebar__item k-scopebar__search">
                            <div class="search__container search__container--has_empty_button">
                                <label for="search">
                                    <i class="icon-search"></i>
                                </label>
                                <input type="search" name="search" class="search_button" placeholder="Find by title or description…" value="" id="search">
                                <a class="search_button--empty"><span>X</span></a>
                            </div>
                        </div><!-- .k-scopebar-search -->

                    </div>

                    <!-- Table -->
                    <div class="k-table-container">
                        <div class="k-table">
                            <table class="table--fixed">
                                <tbody>
                                <?php for ($x = 0; $x <= 16; $x++) { ?>
                                <tr>
                                    <td><a href="form.html">Example file</a></td>
                                </tr>
                                <?php } ?>
                                </tbody>
                            </table>

                        </div><!-- .k-table -->

                        <div class="k-table-pagination">
                            <div class="k-pagination">
                                <div class="limit">
                                    <select name="limit" size="1">
                                        <option value="5" class="level1">5</option>
                                        <option value="10" class="level1">10</option>
                                        <option value="15" class="level1">15</option>
                                        <option value="20" class="level1" selected="selected">20</option>
                                        <option value="25" class="level1">25</option>
                                        <option value="30" class="level1">30</option>
                                        <option value="50" class="level1">50</option>
                                        <option value="100" class="level1">100</option>
                                    </select>
                                </div>
                            </div>
                        </div><!-- .k-table-pagination -->
                    
                    </div><!-- .k-table-container -->

                </div><!-- .k-component-->

            </div><!-- .k-content -->

            <!-- Right sidebar -->
            <div id="k-sidebar-right" class="k-sidebar-right">
                <p><strong>Selected file</strong></p>
                <p><img src="http://demo.joomlatools.com/joomla3/docman/image-gallery/127-donkey-1/file"></p>
                <p><strong class="labl">Name</strong> Donkey.jpg</p>
                <p><strong class="labl">Dimensions</strong> 1280 x 897</p>
                <p><strong class="labl">Size</strong> 449.57KB</p>
                <p style="margin-top: 1em;"><a href="select-document.html" class="btn btn-success btn-block">Insert file</a></p>
            </div><!-- .k-sidebar-right -->

        </form><!-- .k-content-wrapper -->

    </div><!-- .k-overview -->

<?php include '_footer.php'; ?>