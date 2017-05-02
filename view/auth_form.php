<div id="auth_block">
    <form class="form-signin" action="" method="POST" id="auth_form" target="hidden_frame">
        <?php if (isset($alerts)) echo $alerts?>
        <h2 class="form-signin-heading">Please sign in</h2>
        <input type="text" class="form-control" placeholder="Name" name="name" required="" autofocus="">
        <input type="password" class="form-control" placeholder="Password" name="password" required="">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
</div>
