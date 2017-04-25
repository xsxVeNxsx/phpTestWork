<?php
include_once "session_handler.php";

class Base_Controller
{
    protected $template = "base";
    protected $actions = [];
    protected $title = "";
    protected $scripts = ["jquery", "bootstrap.min", "settings"];
    protected $styles = ["bootstrap.min", "bootstrap-reboot.min", "style"];
    protected $need_auth = false;
    protected $home_url;

    public function execute()
    {
        session_start();
        $this->home_url = Config::get("URL", "home");
        $action = $_REQUEST["action"];
        if (!isset($action) || !in_array($action, $this->actions))
            $action = "index";
        if ($this->need_auth && !Sessions::is_authorized())
        {
            header("Location: $this->home_url?controller=auth");
            return;
        }
        try
        {
            return $this->$action();
        } catch (Exception $e)
        {
            $blocks = [$this->render_block($this->template, ["errors" => $e->getMessage()])];
            return $this->render($blocks);
        }
    }

    protected function render($blocks = [], $vars = [])
    {
        $common_vars = [
            "blocks" => $blocks,
            "title" => $this->title,
            "scripts" => $this->scripts,
            "styles" => $this->styles,
            "is_authed" => Sessions::is_authorized(),
            "img_url" => Config::get("URL", "img"),
            "home_url" => $this->home_url
        ];
        extract(array_merge($vars, $common_vars));
        include "view/$this->template.php";
    }

    protected function render_block($template, $vars = null)
    {
        ob_start();
        if ($vars != null)
            extract($vars);
        include "view/$template.php";
        $result = ob_get_contents();
        ob_end_clean();
        return $result;
    }
}
