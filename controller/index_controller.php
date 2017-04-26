<?php

require_once "base_controller.php";

class Index_Controller extends Base_Controller
{
    public function __construct()
    {
        $this->title = "Main Page";
        $this->actions = array_merge($this->actions, ["index"]);
        $this->scripts = array_merge($this->scripts, ["comments"]);
    }

    public function index()
    {
        $public_form_block = $this->render_block("public_comments_form_block");
        $blocks = [
            $this->render_block("navbar"),
            $this->render_block("comments_list"),
            $this->render_block("comments_form", ["block" => $public_form_block])
        ];
        $this->render($blocks);
    }
}
