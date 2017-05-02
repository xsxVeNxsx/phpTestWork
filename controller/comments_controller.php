<?php

require_once "config.php";
require_once "base_controller.php";
require_once "model/comments_model.php";
require_once "model/users_model.php";
include_once "validation/comments_validation.php";

class Comments_Controller extends Base_Controller
{
    public function __construct()
    {
        $this->title = "Comments";
        $this->actions = array_merge($this->actions, ["add", "get_comments"]);
    }

    public function add()
    {
        (new Comments_Validation())->check($_POST);
        $extention = explode("/", $_FILES['file']['type'])[1];
        $tmp_file = $_FILES['file']['tmp_name'];
        $new_file = mt_rand().".$extention";
        $this->resize_img(
            $tmp_file,
            $new_file,
            $extention,
            intval(Config::get("Img", "max_width")),
            intval(Config::get("Img", "max_height"))
        );
        (new Comments_Model())->add(
            array_merge($_POST, ["img" => $new_file, "approved" => 0, "date" => date("Y-m-d H:i:s")])
        );
        return $this->render_block("frame_messages", ["success" => "Comment added successfully"]);
    }

    public function get_comments()
    {
        header('Content-Type: application/json');
        return json_encode((new Comments_Model())->approved($_GET, $_GET));
    }

    protected function resize_img($tmp_file, $new_file, $extention, $max_width, $max_height)
    {
        $imagecreatefrom_f = "imagecreatefrom$extention";
        $image_f = "image$extention";
        $size = getimagesize($tmp_file);
        if (!$size || !in_array($size["mime"], ["image/jpeg", "image/gif", "image/png", "image/jpg"]))
            throw new Exception("Incorrect file format");
        $img = $imagecreatefrom_f($tmp_file);
        $new_width = $width = imagesx($img);
        $new_height = $height = imagesy($img);
        if ($new_height > $max_height)
        {
            $new_height = $max_height;
            $new_width = floor($width * ($max_height / $height));
        }
        if ($new_width > $max_width)
        {
            $new_width = $max_width;
            $new_height = floor($height * ($max_width / $width));
        }
        $tmp_img = imagecreatetruecolor($new_width, $new_height);
        imagecopyresized($tmp_img, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
        $image_f($tmp_img, getcwd()."/".Config::get("Dir", "img").$new_file);
    }
}
