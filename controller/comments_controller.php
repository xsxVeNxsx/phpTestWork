<?php

require_once "config.php";
require_once "base_controller.php";
require_once "model/comments_model.php";
require_once "model/users_model.php";

class Comments_Controller extends Base_Controller
{
    public function __construct()
    {
        $this->title = "Comments";
        $this->actions = array_merge($this->actions, ["add", "edit", "get_comments", "get_approved_comments"]);
    }

    public function add()
    {
        $tmp_file = $_FILES['file']['tmp_name'];
        $new_file = mt_rand().".jpg";
        $this->resize_img($tmp_file, $new_file, Config::get("Img", "max_width"), Config::get("Img", "max_height"));
        (new Comments_Model())->add(
            array_merge($_POST, ["img" => $new_file, "approved" => 0, "date" => date("Y-m-d H:i:s")])
        );
        return "OK";
    }

    public function edit()
    {
        $params["where"] = ["id" => $_POST["id"]];
        $params["set"] = $_POST;
        $params["set"]["edited"] = 1;
        (new Comments_Model())->edit($params);
        return "OK";
    }

    public function get_comments()
    {
        if (!Sessions::is_authorized())
            $this->get_approved_comments();
        header('Content-Type: application/json');
        return json_encode((new Comments_Model())->all());
    }

    public function get_approved_comments()
    {
        header('Content-Type: application/json');
        return json_encode((new Comments_Model())->approved());
    }

    protected function resize_img($tmp_file, $new_file, $max_width, $max_height)
    {
        $img = imagecreatefromjpeg($tmp_file);
        $new_width = $width = imagesx($img);
        $new_height = $height = imagesy($img);
        if ($width > $max_width or $height > $max_height)
        {
            $w_or_h = $max_width > $max_height ? true : false;
            $new_width = $w_or_h ? $max_width : floor($width * ($max_height / $height));
            $new_height = $w_or_h ? floor($height * ($max_width / $width)) : $max_height;
        }
        $tmp_img = imagecreatetruecolor($new_width, $new_height);
        imagecopyresized($tmp_img, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
        imagejpeg($tmp_img, getcwd()."/".Config::get("Dir", "img").$new_file);
    }
}
