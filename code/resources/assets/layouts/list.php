<?php include '_header.php'; ?>

<!-- Wrapper -->
<div class="k-wrapper">

    <!-- Overview -->
    <div class="k-content-wrapper">

        <!-- Sidebar -->
        <div id="k-sidebar" class="k-sidebar">

            <!-- Navigation -->
            <div class="k-sidebar__item">
                <ul class="k-navigation">
                    <li class="active">
                        <a href="#">Menu item</a>
                    </li>
                    <li>
                        <a href="#">Menu item</a>
                    </li>
                    <li>
                        <a href="#">Menu item</a>
                    </li>
                </ul>
            </div><!-- .k-sidebar__item -->


            <!-- Categories -->
            <div class="k-sidebar__item k-sidebar__item--overflow">
                <div class="k-sidebar__header">
                    Categories
                </div>
                <div class="k-tree">
                    Tree
                </div><!-- k-tree -->
            </div>

            <!-- Filters -->
            <div class="k-sidebar__item">
                <div class="k-sidebar__header">
                    Quick filters
                </div>
                <ul class="k-list">
                    <li class="active">
                        <a href="#">
                            <span class="k-icon-person"></span>
                            My Documents
                        </a>
                    </li>
                    <li class="active">
                        <a href="#">
                            <span class="k-icon-clock"></span>
                            Recently added
                        </a>
                    </li>
                    <li class="active">
                        <a href="#">
                            <span class="k-icon-pencil"></span>
                            Recently edited
                        </a>
                    </li>
                    <li class="active">
                        <a href="#">
                            <span class="k-icon-star"></span>
                            Most popular
                        </a>
                    </li>
                </ul>
            </div><!-- .k-sidebar__item -->
        </div><!-- .k-sidebar-->

        <!-- Content -->
        <div class="k-content">

            <!-- Title when sidebar is inivisible -->
            <div class="k-mobile-title hide-when-sidebar-is-visible">
                <div class="k-heading">Page title</div>
            </div>

            <!-- Toolbar -->
            <div class="k-toolbar">
                <div class="off-canvas-menu-toggle-holder" role="button" aria-expanded="false">
                    <button class="off-canvas-menu-toggle" type="button">
                        <span class="bar1"></span>
                        <span class="bar2"></span>
                        <span class="bar3"></span>
                    </button>
                </div>
                <a class="toolbar btn btn-default btn-sm k-btn-new btn-success" href="#" id="toolbar-new">
                    <i class="icon-new icon-white"></i>
                    <span class="k-toolbar__text">New</span>
                </a>
                <a class="toolbar btn btn-default btn-sm k-btn-options" href="#" id="toolbar-options">
                    <i class="icon-options"></i>
                    <span class="k-toolbar__text">Options</span>
                </a>
            </div><!-- .k-toolbar -->

                  <!-- Component -->
            <div class="k-component">

                <!-- Form -->
                <form class="k-list-layout -koowa-grid" id="k-offcanvas-container" action="" method="get">

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
                                    Item
                                </a>
                            </li>
                            <li class="active">
                                <span class="k-breadcrumb__item">Current item</span>
                            </li>
                        </ul>
                    </div><!-- .k-breadcrumbs -->

                    <!-- Scopebar -->
                    <div class="k-scopebar">
                        Scopebar - under construction
                    </div><!-- .k-scopebar -->

                    <!-- Table -->
                    <div class="k-table-container">
                        <div class="k-table">

                            <table class="table--fixed footable">
                                <thead>
                                <tr>
                                    <th width="1%">
                                        <input type="checkbox">
                                    </th>
                                    <th class="docman_table__title_field">
                                        Title
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="checkbox">
                                    </td>
                                    <td class="docman_table__title_field">
                                        <div class="koowa_wrapped_content">
                                            <div class="whitespace_preserver">
                                                <a href="#">
                                                    Title
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div><!-- .k-table -->

                        <div class="k-table-pagination">
                            Pagination
                        </div><!-- .k-table-pagination -->

                    </div><!-- .k-table-container -->

                </form><!-- .k-list-layout -->

            </div><!-- .k-component -->

        </div><!-- k-content -->

    </div><!-- .k-content-wrapper -->

</div><!-- .k-wrapper -->

<?php include '_footer.php'; ?>