<?php include '_header.php'; ?>

    <!-- Form layout -->
    <div class="k-form k-form--front">

        <!-- Form -->
        <form action="" method="post" class="k-content-wrapper -koowa-form">

            <!-- The content -->
            <div class="k-content">

                <!-- Toolbar -->
                <div class="k-toolbar">
                    <div class="koowa-toolbar">
                        <a class="toolbar btn btn-default btn-sm k-btn-apply btn-success" data-action="apply" href="#">
                            <i class="icon-apply icon-white"></i>
                            <span class="k-toolbar__text">Save</span>
                        </a>
                        <a class="toolbar btn btn-default btn-sm k-btn-save" data-action="save" href="#">
                            <i class="icon-save"></i>
                            <span class="k-toolbar__text">Save &amp; Close</span>
                        </a>
                        <a data-novalidate="novalidate" class="toolbar btn btn-default btn-sm k-btn-cancel" data-action="cancel" href="#">
                            <i class="icon-cancel"></i>
                            <span class="k-toolbar__text">Cancel</span>
                        </a>
                    </div>
                </div>

                <!-- Component -->
                <div class="k-component">

                    <!-- Container -->
                    <div class="k-container">

                        <!-- Main information -->
                        <div class="k-container__main">

                            <fieldset>

                                <?php // @TODO: make sure we can just delete this <legend> without a new one being created ?>
                                <legend style="height:0;overflow:hidden;padding:0;margin:0;border:none;">Legend</legend>

                                <div class="control-group">
                                    <div class="controls">
                                        <input required="" class="form-control input-lg" id="todo_form_title" type="text" name="title" maxlength="255" value="" placeholder="Enter title here">
                                    </div>
                                </div>

                                <div class="control-group">
                                    <div class="controls">

                                        <div class="input-group input-group-sm">
                                            <label for="todo_form_alias" class="input-group-addon">
                                                Alias
                                            </label>
                                            <input id="todo_form_alias" type="text" class="form-control" name="slug" maxlength="255" value="" placeholder="Will be created automatically">
                                            <div class="input-group-btn">
                                                <button class="btn btn-md btn-default mfp-iframe" data-mfp-src="/media/koowa/framework/new-ui/layouts/select-document.php">Select document</button>
                                            </div>
                                            <div class="input-group-btn">
                                                <button class="btn btn-md btn-default mfp-iframe" data-mfp-src="/media/koowa/framework/new-ui/layouts/select-file.php">Select file</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="control-group">
                                    <div class="controls">
                                        <textarea style="border:1px solid #ccc;width:100%;height:400px;margin-bottom: 1em;"></textarea>
                                    </div>
                                </div>

                            </fieldset>

                        </div><!-- .k-container__main -->

                        <!-- Other information -->
                        <div class="k-container__sub">

                            <fieldset class="k-form-block">

                                <div class="k-form-block__header">
                                    Publishing
                                </div>

                                <div class="k-form-block__content">
                                    <div class="control-group">
                                        <div class="control-content">
                                            <label class="control-label">Status</label>
                                            <div class="controls">
                                                <div class="radio-toggle">
                                                    <div class="radio-toggle-item">
                                                        <input type="radio" name="status" id="status1" value="1" checked="checked">
                                                        <label for="status1">
                                                        <span>
                                                            Published
                                                        </span>
                                                        </label>
                                                    </div>
                                                    <div class="radio-toggle-item">
                                                        <input type="radio" name="status" id="status0" value="0">
                                                        <label for="status0">
                                                        <span>
                                                            Unpublished
                                                        </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>

                        </div><!-- .k-container__sub -->

                    </div><!-- .k-container -->

                </div><!-- .k-component -->

            </div><!-- .k-content -->

        </form><!-- .k-content-wrapper -->

    </div><!-- .k-form -->

<?php include '_footer.php'; ?>