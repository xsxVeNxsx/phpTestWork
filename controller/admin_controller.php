<?php

require_once "config.php";
require_once "base_controller.php";
require_once "model/comments_model.php";
require_once "model/users_model.php";

class Admin_Controller extends Base_Controller
{

    public function __construct()
    {
        $this->title = "Admin Page";
        $this->need_auth = true;
        $this->actions = array_merge($this->actions, ["index"]);
        $this->scripts = array_merge($this->scripts, ["comments"]);
    }

    public function index()
    {
        $blocks = [$this->render_block("navbar"),
                   $this->render_block("comments_list")];
        $this->render($blocks);
    }
}
