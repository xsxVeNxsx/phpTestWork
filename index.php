<?php

//error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);
error_reporting(0);
require_once "config.php";
require_once "controller/index_controller.php";
require_once "controller/auth_controller.php";
require_once "controller/admin_controller.php";
require_once "controller/comments_controller.php";

Config::set_timezone();

$controllers = ["index" => Index_Controller,
                "auth" => Auth_Controller,
                "admin" => Admin_Controller,
                "comments" => Comments_Controller];

$controller = $_GET["controller"];
if (!isset($controller))
    $controller = "index";
echo (new $controllers[$controller]())->execute();
