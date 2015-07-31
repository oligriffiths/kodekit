<?php include '_header.php'; ?>

    <!-- Begin List layout -->
    <div class="k-overview">

        <!-- Titlebar -->
        <div class="k-titlebar">
            <!-- Sidebar toggle button -->
            <button id="k-toggle-button" class="off-canvas-menu-toggle" type="button">
                <span class="bar1"></span>
                <span class="bar2"></span>
                <span class="bar3"></span>
            </button>
            <h2 style="float: left;">Select / Upload document</h2>
            <button id="k-toggle-button-right" class="off-canvas-menu-toggle" type="button" style="float: right;">
                <span class="bar1"></span>
                <span class="bar2"></span>
                <span class="bar3"></span>
            </button>
        </div>

        <!-- The content -->
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
                                    <span class="k-title">Menu item</span>
                                </a>
                            </li>
                            <li class="k-tree active">
                                <a href="#">
                                    <span class="k-clicker"></span>
                                    <span class="k-icon-folder"></span>
                                    <span class="k-title">Some other menu item</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div> <!-- .k-sidebar -->

            <!-- The content -->
            <div class="k-content">

                <!-- contents -->
                <div class="k-component-wrapper">

                    <!-- Component -->
                    <div class="k-component">

                        <!-- Breadcrumbs -->
                        <div class="k-breadcrumb">
                            <ul>
                                <li class="home">
                                    <a class="k-breadcrumb__item k-icon-home" href="#">
                                        <span class="visually-hidden-icon-label">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="k-breadcrumb__item" href="#">
                                        Some menu item
                                    </a>
                                </li>
                                <li class="active">
                                    <span class="k-breadcrumb__item" data-title="Some other menu item">Some other menu item</span>
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
                        </div>

                        <!-- Scopebar -->
                        <div class="k-scopebar">

                            <!-- Filter items by -->
                            <div class="k-scopebar__item k-scopebar__item--fluid">
                                <div class="select2-wrapper select2--link-style select2--filter">
                                    <select name="enabled" id="select2-filter-access" data-placeholder="Access">
                                        <option></option>
                                        <option value="1">Super administrator</option>
                                        <option value="0">Publisher</option>
                                        <option value="0">Editor</option>
                                        <option value="0">Public</option>
                                    </select>
                                </div>
                                <div class="select2-wrapper select2--link-style select2--filter">
                                    <select name="enabled" id="select2-filter-date" data-placeholder="Date">
                                        <option></option>
                                        <option value="1">Published</option>
                                        <option value="0">Unpublished</option>
                                        <option value="0">Pending</option>
                                        <option value="0">Archived</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Search filtered items -->
                            <div class="k-scopebar__item k-scopebar__search">
                                <div class="search__container search__container--has_empty_button">
                                    <label for="search">
                                        <i class="icon-search"></i>
                                    </label>
                                    <input type="search" name="search" class="search_button" placeholder="Find by title or description…" value="" id="search">
                                    <a class="search_button--empty"><span>X</span></a>
                                </div>
                            </div>

                        </div>

                        <!-- The table -->
                        <div class="k-table-container">
                            <div class="k-table">
                                <table class="table--fixed" summary="List of documents">
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Access</th>
                                        <th>Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php for ($x = 0; $x <= 10; $x++) { ?>
                                    <tr>
                                        <td><a href="form.html">Example file</a></td>
                                        <td>Public</td>
                                        <td>21 may 2015</td>
                                    </tr>
                                    <?php } ?>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colspan="3">
                                            <div class="table-pagination">
                                                <select>
                                                    <option>20</option>
                                                    <option>50</option>
                                                    <option>100</option>
                                                    <option>All</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div> <!-- .k-component -->

                </div> <!-- .k-component-wrapper -->

            </div> <!-- .k-content -->

            <!-- Selected file -->
            <div id="k-sidebar-right" class="k-sidebar-right">
                <div class="control-group margin-bottom">
                    <label class="control-label" for="name">Name</label>
                    <div class="controls">
                        <input required class="form-control" id="name" type="text" name="name" value="Example file" />
                    </div>
                </div>
                <div class="control-group margin-bottom">
                    <label class="control-label" for="class">Class</label>
                    <div class="controls">
                        <input required class="form-control" id="class" type="text" name="class" value="" placeholder="Add class" />
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <a href="select-file.html" class="btn btn-success btn-block">Insert category link</a>
                    </div>
                </div>
            </div>

        </form> <!-- .k-content-wrapper -->

    </div> <!-- .k-overview -->

<?php include '_footer.php'; ?>