<?php

require_once "base_controller.php";
require_once "model/users_model.php";

class Auth_Controller extends Base_Controller
{
    public function __construct()
    {
        $this->title = "Authentication";
        $this->scripts = array_merge($this->scripts, ["auth"]);
        $this->styles = array_merge($this->styles, ["signin"]);
        $this->actions = array_merge($this->actions, ["signin", "signout"]);
    }

    public function index()
    {
        $alerts = $this->render_block("alerts");
        $blocks = [
            $this->render_block("navbar"),
            $this->render_block("auth_form", ["alerts" => $alerts]),
            $this->render_block("hidden_frame")
        ];
        $this->render($blocks);
    }

    public function signin()
    {
        $user = new Users_Model();
        if (!$user->is_user($_POST))
            throw new Exception("Incorrect name or password");

        Sessions::set($user->get(["name" => $_REQUEST["name"]])["data"][0]["id"]);
        return $this->render_block("frame_messages", ["success" => "Success authentication"]);
    }

    public function signout()
    {
        Sessions::clear();
        header("Location: $this->home_url");
    }
}
