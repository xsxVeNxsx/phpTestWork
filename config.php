<?php

$config = parse_ini_file("config.ini", true);

class Config
{
    public static function get($section, $field)
    {
        global $config;
        return $config[$section][$field];
    }

    public static function set_timezone()
    {
        global $config;
        date_default_timezone_set($config["global"]["timezone"]);
    }
}
