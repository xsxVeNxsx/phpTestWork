<?php

require_once "base_controller.php";
require_once "model/users_model.php";

class Auth_Controller extends Base_Controller
{
    public function __construct()
    {
        $this->title = "Authentication";
        //$this->scripts = array_merge($this->scripts, ["auth"]);
        $this->styles = array_merge($this->styles, ["signin"]);
        $this->actions = array_merge($this->actions, ["signin", "signout"]);
    }

    public function index()
    {
        $blocks = [$this->render_block("navbar"),
                   $this->render_block("auth_form")];
        $this->render($blocks);
    }

    public function signin()
    {
        $user = new Users_Model();
        if (!$user->is_user($_POST))
            throw new Exception("Incorrect name or password");

        Sessions::set($user->get(["name" => $_REQUEST["name"]])[0]["id"]);
        header("Location: $this->home_url?controller=admin");
    }

    public function signout()
    {
        Sessions::clear();
        header("Location: $this->home_url");
    }
}
