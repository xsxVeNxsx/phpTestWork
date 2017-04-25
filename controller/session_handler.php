<?php

class Sessions
{
    public static function set($user_id)
    {
        $_SESSION["id"] = $user_id;
        $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
    }

    public static function is_authorized()
    {
        if (!isset($_SESSION["id"]) || !isset($_SESSION["ip"]) ||
                    $_SESSION["ip"] != $_SERVER['REMOTE_ADDR'])
            return false;
        return true;
    }

    public static function clear()
    {
        unset($_SESSION["id"]);
        unset($_SESSION['ip']);
    }
}
