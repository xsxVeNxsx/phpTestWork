<?php
require_once "base_model.php";

class Comments_Model extends Base_Model
{
    protected $order = ["field" => "date", "rule" => "DESC"];

    public function __construct()
    {
        parent::__construct("comments", ["author", "email", "img", "msg", "approved", "edited", "date"]);
    }

    public function all($order, $pagination)
    {
        return $this->get([], $order, $pagination);
    }

    public function approved($order, $pagination)
    {
        return $this->get(["approved" => 1], $order, $pagination);
    }
}
