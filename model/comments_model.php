<?php
require_once "base_model.php";

class Comments_Model extends Base_Model
{
    public function __construct()
    {
        parent::__construct("comments", ["author", "email", "img", "msg", "approved", "date"]);
    }

    public function all()
    {
        return $this->get();
    }

    public function approved()
    {
        return $this->get(["approved" => 1]);
    }
}
