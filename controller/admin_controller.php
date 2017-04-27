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
        $this->actions = array_merge($this->actions, ["index", "edit_comment", "change_comment_status", "get_comments"]);
        $this->scripts = array_merge($this->scripts, ["comments", "admin"]);
    }

    public function index()
    {
        $admin_buttons = $this->render_block("admin_comments_form_block");
        $blocks = [
            $this->render_block("navbar"),
            $this->render_block("comments_list", ["is_admin" => true]),
            $this->render_block("comments_form", ["is_admin" => true, "block" => $admin_buttons])
        ];
        $this->render($blocks);
    }

    public function edit_comment()
    {
        $params = ["where" => ["id" => $_POST["id"]], "set" => $_POST];
        $params["set"]["edited"] = 1;
        (new Comments_Validation())->check($params["set"]);
        (new Comments_Model())->edit($params);
        return $this->render_block("frame_messages", ["success" => "Comment edited successfully"]);
    }

    public function change_comment_status()
    {
        $params = ["where" => ["id" => $_POST["id"]], "set" => ["approved" => $_POST["approved"], "date" => $_POST["date"]]];
        (new Comments_Model())->edit($params);
        return $this->render_block("frame_messages", ["success" => "Comment edited successfully"]);
    }

    public function get_comments()
    {
        header('Content-Type: application/json');
        return json_encode((new Comments_Model())->all($_GET));
    }
}
