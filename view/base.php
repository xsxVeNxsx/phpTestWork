<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <?php foreach ($scripts as $script)
            echo "<script type='text/javascript' src='view/js/$script.js?'></script>";
          foreach ($styles as $style)
            echo "<link type='text/css' rel='stylesheet' href='view/css/$style.css?'>";
        ?>
        <title><?php echo $title?></title>
    </head>
    <body>
        <script>init_config("<?php echo $img_url?>", "<?php echo $home_url?>", "<?php echo $is_authed?>")</script>
        <div class="container" id="main_container">
            <?php foreach ($blocks as $block)
                echo $block;
            ?>
        </div>
    </body>
</html>
