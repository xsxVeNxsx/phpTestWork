<div id="comments_form_block" class="container <?php if (isset($is_admin)) echo "invisible"?>">
    <h2 class="form-signin-heading" id="comment_form_title">Add comment</h2>
    <form action="?controller=comments&action=add" enctype="multipart/form-data" method="POST" id="comment_form" target="hidden_frame">
        <?php if (isset($alerts)) echo $alerts?>
        <div class="row">
            <div class="d-inline-block row_left">
                <div class="form-group">
                    <label for="comment_author">Name</label>
                    <input type="text" name="author" id="comment_author" class="form-control" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="comment_email">Email</label>
                    <input type="email" name="email" id="comment_email" class="form-control" placeholder="Email">
                </div>
            </div>
            <div class="form-group d-inline-block card-block row_right">
                <label for="comment_msg">Message</label>
                <textarea name="msg" class="form-control" id="comment_msg" rows="3"></textarea>
            </div>
            <?php echo $block; ?>
        </div>
    </form>
    <iframe id="hidden_frame" name="hidden_frame" class="invisible">
        <html>
            <body>
            </body>
        </html>
    </iframe>
</div>
