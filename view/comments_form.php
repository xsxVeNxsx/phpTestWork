<div id="comments_form_block">
    <form action="?controller=comments&action=add" enctype="multipart/form-data" method="POST" id="comments_form" target="hidden_frame">
        <h2 class="form-signin-heading">Add comment</h2>
        <div class="form-group">
            <label for="comment_author">Name</label>
            <input type="text" name="author" id="comment_author" class="form-control" placeholder="Name">
        </div>
        <div class="form-group">
            <label for="comment_email">Email</label>
            <input type="email" name="email" id="comment_email" class="form-control" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="comment_msg">Message</label>
            <textarea name="msg" class="form-control" id="comment_msg" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label for="comment_file">Image</label>
            <input type="file" name="file" class="form-control-file" id="comment_file" accept="image/jpeg,image/png,image/gif">
        </div>
        <button type="submit" class="btn btn-primary" name="load" id="load">Submit</button>
    </form>
    <iframe id='hidden_frame' name='hidden_frame'>
        <html>
            <body>
            </body>
        </html>
    </iframe>
</div>
