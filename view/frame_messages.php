<?php
if (isset($errors))
    foreach ($errors as $error)
        echo "<div id='errors'>$error</div>";
if (isset($success))
    echo "<div id='success'>$success</div>";
?>
